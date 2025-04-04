
import fs from 'fs';
// import path from ('path');

export default function convertMongoToRelational(mongoData, outputFilePath) {
  try {
  
  debugger;
    // Check if the data is an array
    if (!Array.isArray(mongoData)) {
      console.error('Input data is not an array. Expected an array of MongoDB documents.');
      return;
    }
    
    // Transform the data
    const simplifiedData = mongoData.map(presentation => {
      // Create a simplified presentation object
      const simplifiedPresentation = {
        id: presentation._id.$oid, // Preserve MongoDB ID as a simple string
        tcode: presentation.tcode,
        chapter: presentation.chapter,
        exercise: presentation.exercise,
        filename: presentation.filename,
        questionNo: presentation.questionNo,
        part: presentation.part,
        name: presentation.name,
        questionType: presentation.questionType,
        status: presentation.status,
        tags: presentation.tags,
        sortOrder: presentation.sortOrder,
        comments: presentation.comments,
        slides: [] // Will be populated with simplified slides
      };
      
      // Process slides if they exist
      if (Array.isArray(presentation.slides)) {
        simplifiedPresentation.slides = presentation.slides.map(slide => {
          // Create a simplified slide object
          const simplifiedSlide = {
            id: slide._id ? slide._id.$oid : null, // Preserve MongoDB ID as a simple string
            uuid: slide.uuid,
            startTime: slide.startTime,
            endTime: slide.endTime,
            type: slide.type,
            version: slide.version,
            template: slide.template,
            imagesUrl: slide.slideExtra ? slide.slideExtra.imagesUrl : null,
            items: [] // Will be populated with simplified items
          };
          
          // Process items if they exist
          if (Array.isArray(slide.items)) {
            simplifiedSlide.items = slide.items.map(item => {
              // Merge item and itemExtra as suggested
              const simplifiedItem = {
                id: item._id ? item._id.$oid : null, // Preserve MongoDB ID as a simple string
                uuid: item.uuid,
                name: item.name,
                content: item.content,
                showAt: item.showAt,
                hideAt: item.hideAt,
                // Include itemExtra properties directly
                startTime: item.itemExtra ? item.itemExtra.startTime : null,
                endTime: item.itemExtra ? item.itemExtra.endTime : null,
                code: item.itemExtra ? item.itemExtra.code : null,
                type: item.itemExtra ? item.itemExtra.type : null,
                sp: [] // Will be populated with sp items
              };
              
              // Process sp items if they exist
              if (item.itemExtra && Array.isArray(item.itemExtra.sp)) {
                simplifiedItem.sp = item.itemExtra.sp.map(spItem => ({
                  code: spItem.code,
                  type: spItem.type
                }));
              }
              
              return simplifiedItem;
            });
          }
          
          return simplifiedSlide;
        });
      }
      
      return simplifiedPresentation;
    });
    
    // Write the simplified data to a file
    fs.writeFileSync(
      outputFilePath, 
      JSON.stringify(simplifiedData, null, 2), 
      'utf8'
    );
    
    console.log(`Conversion completed successfully!`);
    console.log(`Original data length: ${mongoData.length} presentations`);
    console.log(`Simplified data length: ${simplifiedData.length} presentations`);
    console.log(`Output saved to: ${outputFilePath}`);
    
    return simplifiedData;
  } catch (error) {
    console.error('An error occurred during conversion:', error.message);
  }
}

