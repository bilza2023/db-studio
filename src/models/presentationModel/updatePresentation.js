

const presentationHelpers = require("./presentationHelpers.js");

async function updatePresentation(prisma, req, res) {
    try {
      const {
        presentationId,
        presentationData,
        eqSlidesData,
        canvasSlidesData,
      } = req.body;

      // Validate required data
      if (!presentationId) {
        return res.status(400).json({ error: "Presentation ID is required" });
      }
      // Check if presentation exists
      const existingPresentation = await prisma.presentation.findUnique({
        where: { id: presentationId }
      });
  
      if (!existingPresentation) {
        return res.status(404).json({ error: "Presentation not found" });
      }
  
      // Start a transaction for data consistency
      const result = await prisma.$transaction(async (prisma) => {
        // 1. Update the base presentation if data is provided
        if (presentationData) {
          await prisma.presentation.update({
            where: { id: presentationId },
            data: {
              tcode: presentationData.tcode,
              chapter: presentationData.chapter,
              exercise: presentationData.exercise,
              filename: presentationData.filename,
              questionNo: presentationData.questionNo,
              part: presentationData.part,
              name: presentationData.name || existingPresentation.name,
              questionType: presentationData.questionType,
              status: presentationData.status,
              sortOrder: presentationData.sortOrder || existingPresentation.sortOrder,
              comments: presentationData.comments || existingPresentation.comments,
              tags: presentationData.tags || existingPresentation.tags,
            },
          });
        }
  
        // 2. Delete all existing eq slides - cascade will handle children
        await prisma.eqSlide.deleteMany({
          where: {
            presentationId: presentationId
          }
        });
  
        // 3. Delete all existing canvas slides - cascade will handle children
        await prisma.canvasSlide.deleteMany({
          where: {
            presentationId: presentationId
          }
        });
   
        // 4. Create new eq slides if provided
        if (eqSlidesData && eqSlidesData.length > 0) {
          for (const eqSlideData of eqSlidesData) {
            await presentationHelpers.createEqSlide(prisma, presentationId, eqSlideData);
          }
        }
        // debugger;
        // 5. Create new canvas slides if provided
        if (canvasSlidesData && canvasSlidesData.length > 0) {
          for (const canvasSlideData of canvasSlidesData) {
            await presentationHelpers.createCanvasSlide(prisma, presentationId, canvasSlideData);
          }
        }

        return true;
      });
  
    } catch (error) {
      console.error("Error updating presentation:", error);
      return res.status(400).json({ error: error.message });
    }
  }
  
  module.exports = updatePresentation;