

import  { PrismaClient }  from '@prisma/client';


// Initialize Prisma client
const prisma = new PrismaClient();


export default async function importDataToSQLite(presentations) {
  try {
    console.log('Starting data import process...');
    
    console.log(`Found ${presentations.length} presentations to import`);
    
    // Track statistics for reporting
    const stats = {
      presentationsCreated: 0,
      eqSlidesCreated: 0,
      canvasSlidesCreated: 0,
      itemsCreated: 0,
      spCreated: 0
    };
    
    // Process each presentation
    for (const presentation of presentations) {
      try {
        // Extract slides from the presentation
        const slides = presentation.slides || [];
        
        // Create the presentation record without slides
        const createdPresentation = await prisma.presentation.create({
          data: {
            id: presentation.id,
            tcode: presentation.tcode,
            chapter: presentation.chapter,
            exercise: presentation.exercise,
            filename: presentation.filename,
            questionNo: presentation.questionNo,
            part: presentation.part,
            name: presentation.name || '',
            questionType: presentation.questionType,
            status: presentation.status,
            sortOrder: presentation.sortOrder || 0,
            comments: presentation.comments || '',
            tags: JSON.stringify(presentation.tags || []),
          }
        });
        
        stats.presentationsCreated++;
        console.log(`Created presentation: ${createdPresentation.id}`);
        
        // Create a single empty canvas slide for each presentation (requirement #3)
        const canvasSlide = await prisma.canvasSlide.create({
          data: {
            id: uuid(),
            uuid: uuid(),
            type: 'canvas',
            sortOrder: 0,
            presentationId: createdPresentation.id
          }
        });
        
        stats.canvasSlidesCreated++;
        
        // Process each EqSlide
        for (let slideIndex = 0; slideIndex < slides.length; slideIndex++) {
          const slide = slides[slideIndex];
          
          // Create the EqSlide
          const createdSlide = await prisma.eqSlide.create({
            data: {
              id: slide.id,
              uuid: slide.uuid,
              startTime: slide.startTime,
              endTime: slide.endTime,
              type: slide.type,
              version: slide.version,
              template: slide.template || '',
              sortOrder: slideIndex, // Add sortOrder as required
              presentationId: createdPresentation.id
            }
          });
          
          stats.eqSlidesCreated++;
          
          // Process each Item in the slide
          const items = slide.items || [];
          for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            const item = items[itemIndex];
            
            // Create the EqItem
            const createdItem = await prisma.eqItem.create({
              data: {
                id: item.id,
                uuid: item.uuid,
                name: item.name || '',
                content: item.content || '',
                showAt: item.showAt,
                hideAt: item.hideAt,
                startTime: item.startTime,
                endTime: item.endTime,
                code: item.code || '',
                type: item.type,
                sortOrder: itemIndex, // Add sortOrder as required
                slideId: createdSlide.id
              }
            });
            
            stats.itemsCreated++;
            
            // Process each Solution Point (sp) in the item
            const sps = item.sp || [];
            for (let spIndex = 0; spIndex < sps.length; spIndex++) {
              const sp = sps[spIndex];
              
              // Create the Solution Point
              const createdSp = await prisma.sp.create({
                data: {
                  code: sp.code,
                  type: sp.type,
                  sortOrder: spIndex, // Add sortOrder as required
                  itemId: createdItem.id
                }
              });
              
              stats.spCreated++;
            }
          }
        }
      } catch (presentationError) {
        console.error(`Error processing presentation ${presentation.id}:`, presentationError);
      }
    }
    
    // Log final import statistics
    console.log('\nImport completed with the following statistics:');
    console.log(`- Presentations created: ${stats.presentationsCreated}`);
    console.log(`- EqSlides created: ${stats.eqSlidesCreated}`);
    console.log(`- CanvasSlides created: ${stats.canvasSlidesCreated}`);
    console.log(`- EqItems created: ${stats.itemsCreated}`);
    console.log(`- Solution points created: ${stats.spCreated}`);
    
  } catch (error) {
    console.error('An error occurred during import:', error);
  } finally {
    // Always disconnect from the database when done
    await prisma.$disconnect();
  }
}



function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
  }