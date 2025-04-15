


   // Create a presentation record
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
/////////////////////////////
module.exports = createPresentation;