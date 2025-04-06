
const prisma = require("../db.js");
const uuid = require("../uuid");
const presentation = require("./presentationData-manual.js")
const presentationHelpers = require("./presentationHelpers");

  async function create(req, res) {
 
    try {
      debugger;
      // const {
        const presentationData = presentation. presentationData;
        const eqSlidesData = presentation. eqSlidesData;
        const canvasSlidesData = presentation. canvasSlidesData;
      // } = req.body;
  
////////////////////////////////////////////////////////////////////////////////


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
  
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error creating presentation:", error);
      return res.status(400).json({ error: error.message });
    }

  }

  module.exports = create;