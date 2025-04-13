
const uuid = require("../../uuid");

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
module.exports = createEqSlide;