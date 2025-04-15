
const collectItems =  require("./fn/collectItems");

// Fetch the complete presentation with all related data
async function readPresentation(prisma, presentationId) {
// debugger;
    // presentationId = "cb03316d-4484-4c2d-9611-4eea48dc7e37";
    const presentation =  await prisma.presentation.findUnique({
    where: { id: presentationId },
    include: {
        eqSlides: {
        include: {
            items: {
            include: {
                sp: true,
            },
            orderBy: { sortOrder: "asc" },
            },
        },
        orderBy: { sortOrder: "asc" },
        },
        canvasSlides: {
        include: {
            slideExtra: true,
            textItems: true,
            rectangleItems: true,
            circleItems: true,
            imageItems: true,
            lineItems: true,
            rayItems: true,
            dotItems: true,
            ellipseItems: true,
            iconItems: true,
            listItems: true,
            pieChartItems: true,
            angleItems: true,
            spriteItems: true,
            triangleItems: true,
        },
        orderBy: { sortOrder: "asc" },
        },
    },
    });

    presentation.canvasSlides = await collectItems(presentation.canvasSlides);
    presentation.slides = [];
    presentation.slides = [...presentation.slides,...presentation.canvasSlides];
    presentation.slides = [...presentation.slides,...presentation.eqSlides];
    delete presentation.canvasSlides;
    delete presentation.eqSlides;
    return presentation;
}


module.exports = readPresentation