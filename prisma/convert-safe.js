
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
      await prisma.$transaction(async (prisma) => {
        // 1. Create the base presentation
        const createdPresentation = await createPresentation(
          prisma, 
          presentationData
        );
        console.log(`Created presentation: ${createdPresentation.id}`);
        
        // 2. Process slides
        if (presentationData.slides && Array.isArray(presentationData.slides)) {
          await createSlides(prisma, presentationData.id, presentationData.slides);
        }
      });
    }
    
    console.log('Conversion completed successfully!');
  } catch (error) {
    console.error('Error during conversion:', error);
    throw error;
  }
}


async function createSlides(prisma, presentationId, slides) {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    
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
      createEqSlide(prisma, presentationId, slideData);
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
      
      await presentationHelpers.createCanvasSlide(prismaTransaction, presentationId, slideData);
    } else {
      console.warn(`Unknown slide type: ${slide.type}`);
    }
  }
}
//////////////////////////////////////////
async function createPresentation(prisma, presentationData) {
  // debugger;
  return await prisma.presentation.create({
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
async function createEqSlide(prisma,presentationId, eqSlideData) {
  const eqSlide = await prisma.eqSlide.create({
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
    await createEqItems(prisma, eqSlide.id, eqSlideData.items);
  }

  return eqSlide;
}
//////////////////////////
async function createEqItems(prisma, slideId, items) {
const createdItems = [];
for (const itemData of items) {
const eqItem = await prisma.eqItem.create({
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
  await this.createSolutionPoints(prisma, eqItem.id, itemData.sp);
}

createdItems.push(eqItem);
}
return createdItems;
}
// Create solution points for an eqItem
async function createSolutionPoints(prisma, eqItemId, solutionPoints) {
const createdSps = [];
for (const spData of solutionPoints) {
const sp = await prisma.sp.create({
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

