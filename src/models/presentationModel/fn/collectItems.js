


async function collectItems(canvasSlides) {

for (let i = 0; i < canvasSlides.length; i++) {
    let slide = canvasSlides[i];
    slide.items = [];
///////////////////////////////////////////////////////////
        slide.items = [...slide.items,...slide.textItems];
        slide.items = [...slide.items,...slide.rectangleItems];
        slide.items = [...slide.items,...slide.circleItems];
        slide.items = [...slide.items,...slide.imageItems];
        slide.items = [...slide.items,...slide.lineItems];
        slide.items = [...slide.items,...slide.rayItems];

        slide.items = [...slide.items,...slide.dotItems];
        slide.items = [...slide.items,...slide.ellipseItems];
        slide.items = [...slide.items,...slide.iconItems];
        slide.items = [...slide.items,...slide.listItems];
        slide.items = [...slide.items,...slide.pieChartItems];
        slide.items = [...slide.items,...slide.angleItems];
        slide.items = [...slide.items,...slide.spriteItems];
        slide.items = [...slide.items,...slide.triangleItems];
///////////////////////////////////////////////////////////
delete slide.textItems;
delete slide.rectangleItems;
delete slide.circleItems;
delete slide.imageItems;
delete slide.lineItems;
delete slide.rayItems;
delete slide.dotItems;
delete slide.ellipseItems;
delete slide.iconItems;
delete slide.listItems;
delete slide.pieChartItems;
delete slide.angleItems;
delete slide.spriteItems;
delete slide.triangleItems;
///////////////////////////////////////////////////////////
}
    return canvasSlides;
}
  /////////
  
  module.exports = collectItems;