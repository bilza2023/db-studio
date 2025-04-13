
const presentationHelpers = require("./presentationHelpers.js");
const prisma = require("../db.js");



...load the data from file


async function loadDb(incommingData){

for (let i = 0; i < incommingData.length; i++) {
    const presentation = incommingData[i];
        // if(presentation.tcode !== "fbise9math")

         // Start a transaction for data consistency
         const result = await prisma.$transaction(async (prisma) => {
     
            // 1. Create the base presentation
            const presentation = await presentationHelpers.createPresentation(prisma, presentation);
           
            await createSlides(presentation.slides);
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


async function createSlides(presentationId,slides){

    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (slide.type == "eqs") {
          await presentationHelpers.createEqSlide(prisma, presentationId , slide); 
        }
//////////////////////////////////////////////////////        
        if (slide.type == "canvas") {
          await presentationHelpers.createCanvasSlide(prisma, id, slide);
        }
    }
            
}



