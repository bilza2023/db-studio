
const fs = require('fs');
const prisma = require("./convertFn/db.js");
const uuid = require("../uuid");
// const createPresentation = require("./convertFn/create.js");
// const createEqSlide = require("./convertFn/createEqSlide.js");

///////////////////////////////////////////////////////
async function convertMongoToSqlite() {
  try {
    debugger;
    const incomingData = JSON.parse(fs.readFileSync("./mongodb.json", 'utf8'));
    console.log(`Found ${incomingData.length} presentations to process`);
    
    // Process each presentation
    for (let i = 0; i < incomingData.length; i++) {
      const presentationData = incomingData[i];
      console.log(`Processing presentation ${i+1}/${incomingData.length}: ${presentationData.id}`);
      
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
    }
    
    console.log('Conversion completed successfully!');
  } catch (error) {
    console.error('Error during conversion:', error);
    throw error;
  }
}

async function createSlides(tx, presentationId, slides) {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    
    // Transform the slide data to match what presentationHelpers expects
    const slideData = {
      ...slide,
      // Convert startTime and endTime to period (duration)
      period: 10,
      
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
      
      // await presentationHelpers.createCanvasSlide(tx, presentationId, slideData);
    } else {
      console.warn(`Unknown slide type: ${slide.type}`);
    }
  }
}
//////////////////////////////////////////
async function createPresentation(tx, presentationData) {
  // debugger;
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
}
/////////////////////////////////////////////////
async function createEqSlide(tx, presentationId, eqSlideData) {
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
}
//////////////////////////
async function createEqItems(tx, slideId, items) {
  const createdItems = [];
  for (const itemData of items) {
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
  }
  return createdItems;
}
// Create solution points for an eqItem
async function createSolutionPoints(tx, eqItemId, solutionPoints) {
  const createdSps = [];
  for (const spData of solutionPoints) {
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
  }
  return createdSps;
}
/////////////////////////////////////////////////

convertMongoToSqlite();