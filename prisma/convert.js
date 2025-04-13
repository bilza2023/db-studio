
const fs = require('fs');
const prisma = require("./convertFn/db.js");
const uuid = require("../uuid");
// const createPresentation = require("./convertFn/create.js");
// const createEqSlide = require("./convertFn/createEqSlide.js");

// Function to clear the database before starting import
async function clearDatabase() {
  console.log("Clearing database before starting import...");
  
  try {
    // Delete records in reverse order of dependencies to avoid foreign key constraint errors
    // Start with the deepest level entities and work your way up
    await prisma.sp.deleteMany({});
    console.log("Cleared solution points");
    
    await prisma.eqItem.deleteMany({});
    console.log("Cleared equation items");
    
    await prisma.eqSlide.deleteMany({});
    console.log("Cleared equation slides");
    
    // Delete any other slide types if they exist
    // For example, if you have canvas slides in a separate table:
    // await prisma.canvasSlide.deleteMany({});
    
    await prisma.presentation.deleteMany({});
    console.log("Cleared presentations");
    
    console.log("Database cleared successfully");
  } catch (error) {
    console.error("Error clearing database:", error);
    throw error; // Re-throw to stop the process if we can't clear the DB
  }
}

///////////////////////////////////////////////////////
async function convertMongoToSqlite() {
  try {
    // Clear database first
    await clearDatabase();
    
    // Begin conversion process
    const incomingData = JSON.parse(fs.readFileSync("./mongodb.json", 'utf8'));
    console.log(`Found ${incomingData.length} presentations to process`);
    
    // Track successes and failures
    const results = {
      succeeded: 0,
      failed: 0,
      failedIds: []
    };
    
    // Process each presentation
    for (let i = 0; i < incomingData.length; i++) {
      const presentationData = incomingData[i];
      console.log(`Processing presentation ${i+1}/${incomingData.length}: ${presentationData.id || '(no id)'}`);
      
      try {
        // Use a transaction for data consistency
        await prisma.$transaction(async (tx) => {
          // 1. Create the base presentation
          const createdPresentation = await createPresentation(
            tx, 
            presentationData
          );
          console.log(`Created presentation: ${createdPresentation.id}`);
          
          // 2. Process slides
          if (presentationData.slides && Array.isArray(presentationData.slides)) {
            await createSlides(tx, createdPresentation.id, presentationData.slides);
          }
        });
        
        results.succeeded++;
        console.log(`Successfully processed presentation ${i+1}/${incomingData.length}`);
      } catch (error) {
        results.failed++;
        results.failedIds.push(presentationData.id || `index_${i}`);
        console.error(`Error processing presentation ${i+1}/${incomingData.length}:`, error);
        console.log(`Skipping presentation ${i+1} and continuing with next...`);
        // Continue with the next presentation instead of stopping
      }
    }
    
    console.log('Conversion completed!');
    console.log(`Results: ${results.succeeded} succeeded, ${results.failed} failed`);
    if (results.failed > 0) {
      console.log(`Failed presentation IDs: ${results.failedIds.join(', ')}`);
    }
  } catch (error) {
    console.error('Fatal error during conversion process:', error);
    process.exit(1); // Exit with error code
  }
}

async function createSlides(tx, presentationId, slides) {

  for (let i = 0; i < slides.length; i++) {

    const slide = slides[i];
    if (slide.type !== "eqs"){continue;}
    
    try {
      // Transform the slide data to match what presentationHelpers expects
      const slideData = {
        ...slide,
        // Convert startTime and endTime to period (duration)
        period: slide.endTime - slide.startTime,
        
        // Add any other transformations needed for the slide data
        sortOrder: i // Use index as sortOrder if not provided
      };
      
      console.log(`Processing slide ${i+1}/${slides.length} of type: ${slide.type}`);
      
      // Process based on slide type
      if (slide.type === "eqs") {
        await createEqSlide(tx, presentationId, slideData);
      } else if (slide.type === "canvas") {
        // Ensure there's slideExtra data for canvas slides
        if (!slideData.slideExtra) {
          slideData.slideExtra = {
            color: "gray",
            opacity: 0.7,
            backgroundColor: "#363446",
            cellHeight: 25,
            cellWidth: 25,
            showGrid: false,
            gridLineWidth: 1,
            gridLineColor: "black"
          };
        }
        
        await presentationHelpers.createCanvasSlide(tx, presentationId, slideData);
      } else {
        console.warn(`Unknown slide type: ${slide.type}`);
      }
    } catch (error) {
      console.error(`Error processing slide ${i+1}/${slides.length}:`, error);
      throw error; // Re-throw to roll back the transaction for this presentation
    }
  }
}
//////////////////////////////////////////
async function createPresentation(tx, presentationData) {
  try {
    return await tx.presentation.create({
      data: {
        tcode: presentationData.tcode,
        chapter: presentationData.chapter,
        exercise: presentationData.exercise,
        filename: presentationData.filename || "filename",
        questionNo: presentationData.questionNo,
        part: presentationData.part,
        name: presentationData.name || "",
        questionType: presentationData.questionType,
        status: presentationData.status,
        sortOrder: presentationData.sortOrder || 0,
        comments: presentationData.comments || "",
        tags: "",
      },
    });
  } catch (error) {
    console.error(`Error creating presentation ${presentationData.id || '(no id)'}:`, error);
    throw error; // Re-throw to roll back the transaction
  }
}
/////////////////////////////////////////////////
async function createEqSlide(tx, presentationId, eqSlideData) {
  try {
    const eqSlide = await tx.eqSlide.create({
      data: {
        uuid: uuid(),
        period: eqSlideData.period,
        type: eqSlideData.type,
        template: eqSlideData.template || "",
        sortOrder: eqSlideData.sortOrder || 0,
        presentation: {
          connect: { id: presentationId },
        },
      },
    });

    // Create items if provided
    if (eqSlideData.items && eqSlideData.items.length > 0) {
      await createEqItems(tx, eqSlide.id, eqSlideData.items);
    }

    return eqSlide;
  } catch (error) {
    console.error(`Error creating eq slide:`, error);
    throw error; // Re-throw to roll back the transaction
  }
}
//////////////////////////
async function createEqItems(tx, slideId, items) {
  const createdItems = [];
  for (const itemData of items) {
    try {
      const eqItem = await tx.eqItem.create({
        data: {
          uuid: uuid(),
          name: itemData.name || "",
          content: itemData.content || "",
          showAt: itemData.showAt,
          code: itemData.code || "",
          type: itemData.type,
          period: itemData.period,
          sortOrder: itemData.sortOrder || 0,
          slide: {
            connect: { id: slideId },
          },
        },
      });

      // Create solution points if provided
      if (itemData.sp && itemData.sp.length > 0) {
        await createSolutionPoints(tx, eqItem.id, itemData.sp);
      }

      createdItems.push(eqItem);
    } catch (error) {
      console.error(`Error creating eq item:`, error);
      throw error; // Re-throw to roll back the transaction
    }
  }
  return createdItems;
}
// Create solution points for an eqItem
async function createSolutionPoints(tx, eqItemId, solutionPoints) {
  const createdSps = [];
  for (const spData of solutionPoints) {
    try {
      const sp = await tx.sp.create({
        data: {
          code: spData.code,
          type: spData.type,
          sortOrder: spData.sortOrder || 0,
          item: {
            connect: { id: eqItemId },
          },
        },
      });
      createdSps.push(sp);
    } catch (error) {
      console.error(`Error creating solution point:`, error);
      throw error; // Re-throw to roll back the transaction
    }
  }
  return createdSps;
}
/////////////////////////////////////////////////

// Start the conversion process
convertMongoToSqlite()
  .then(() => {
    console.log("Process completed.");
    process.exit(0);
  })
  .catch(error => {
    console.error("Fatal error:", error);
    process.exit(1);
  });