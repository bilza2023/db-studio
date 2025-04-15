
// Fetch multiple records based on tcode, chapter, exercise, questionNo, and part
async function readMany(prisma, req,res) {
  try {

    const {
        tcode,
        chapter,
        exercise    
      } = req.body;

    debugger;
    const records = await prisma.presentation.findMany({ 
      where: {
        tcode:      tcode,
        chapter:    chapter,
        exercise:   exercise
      },
      // You can include related data here if needed, similar to your readPresentation function
      // include: {
      //   relatedField: true,
      // },
      // You can also specify orderBy or other options if required
    });

   
    return records;
  } catch (error) {
    console.error("Error reading multiple records:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

module.exports = readMany;