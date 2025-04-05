
const prisma = require("../db.js");
const uuid = require("../uuid");

const presentationHelpers = require("./presentationHelpers");

  async function create(req, res) {
 
    try {
      // const {
      //   presentationData,     // Basic presentation data
      //   eqSlidesData,         // Array of eq slides
      //   canvasSlidesData      // Array of canvas slides
      // } = req.body;
  
////////////////////////////////////////////////////////////////////////////////
 const presentationData = {
  tcode: "newTcode",
  chapter: 1,
  exercise: "99.99",
  filename: "thisisanewname",
  questionNo: 22,
  part: 333,
  name: "somename",
  questionType: "free",
  status: "final",
  sortOrder: 0,
  comments: "sss",
  tags: "",
 }

 const eqSlidesData = [
  {
    startTime : 0,
    endTime : 10,
    type : "eqs",
    version : "basic",
    template : "",
    sortOrder : 0,
    items : [
      {
        name: "ccc",
        content: "ssss",
        showAt: 0,
        hideAt: 0,
        startTime: 0,
        endTime: 10,
        code: "This is text",
        type: "text",
        sortOrder: 0,
      }
    ]
  }
]

const canvasSlidesData = [{
  type: "canvas",
  sortOrder: 0,
  items : [
    {
      name: "cxcx",
      opacity: 1,
      type: "text",
      color: "red",
      x: 200,
      y: 200,
      rotation: 0,
      text: "This is the text",
      fontSize: 30,
      fontFamily: "Arial",
      width: 40,
      height: 100,
    }
  ]
}];

// 

////////////////////////////////////////////////////////////////////////////////      
      // Validate required data
      if (!presentationData) {
        return res.status(400).json({ error: "Presentation data is required" });
      }
  
      // Start a transaction for data consistency
      const result = await prisma.$transaction(async (prisma) => {
        debugger;
        // 1. Create the base presentation
        const presentation = await presentationHelpers.createPresentation(prisma, presentationData);
        
        // 2. Create eq slides if provided
        if (eqSlidesData && eqSlidesData.length > 0) {
          for (const eqSlideData of eqSlidesData) {
            await presentationHelpers.createEqSlide(prisma, presentation.id, eqSlideData);
          }
        }
        
        // 3. Create canvas slides if provided
        if (canvasSlidesData && canvasSlidesData.length > 0) {
          for (const canvasSlideData of canvasSlidesData) {
            await presentationHelpers.createCanvasSlide(prisma, presentation.id, canvasSlideData);
          }
        }
        return res.status(200).json({ message : "success" });
        // 4. Fetch and return the complete presentation with all related data
        // return await presentationHelpers.getCompletePresentation(prisma, presentation.id);
      });
  
      return res.status(201).json(result);
    } catch (error) {
      console.error("Error creating presentation:", error);
      return res.status(400).json({ error: error.message });
    }

  }

  module.exports = create;