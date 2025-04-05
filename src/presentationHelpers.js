
const uuid = require("../uuid");

// Helper functions for creating presentation components
const presentationHelpers = {

    // Create a presentation record
    async createPresentation(prisma, presentationData) {
      debugger;
      return await prisma.presentation.create({
        data: {
          id: uuid(),
          tcode: presentationData.tcode,
          chapter: presentationData.chapter,
          exercise: presentationData.exercise,
          filename: presentationData.filename,
          questionNo: presentationData.questionNo,
          part: presentationData.part,
          name: presentationData.name || "",
          questionType: presentationData.questionType,
          status: presentationData.status,
          sortOrder: presentationData.sortOrder || 0,
          comments: presentationData.comments || "",
          tags: presentationData.tags || "[]",
        },
      });
    },
  
    // Create solution points for an eqItem
    async createSolutionPoints(prisma, eqItemId, solutionPoints) {
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
    },
  
    // Create items for an eqSlide
    async createEqItems(prisma, slideId, items) {
      const createdItems = [];
      for (const itemData of items) {
        const eqItem = await prisma.eqItem.create({
          data: {
            id: uuid(),
            uuid: uuid(),
            name: itemData.name || "",
            content: itemData.content || "",
            showAt: itemData.showAt,
            hideAt: itemData.hideAt,
            startTime: itemData.startTime,
            endTime: itemData.endTime,
            code: itemData.code || "",
            type: itemData.type,
            sortOrder: itemData.sortOrder || 0,
            slide: {
              connect: { id: slideId },
            },
          },
        });
  
        // Create solution points if provided
        if (itemData.sps && itemData.sps.length > 0) {
          await this.createSolutionPoints(prisma, eqItem.id, itemData.sps);
        }
  
        createdItems.push(eqItem);
      }
      return createdItems;
    },
  
    // Create an eq slide with all its items
    async createEqSlide(prisma, presentationId, eqSlideData) {
      const eqSlide = await prisma.eqSlide.create({
        data: {
          id: uuid(),
          uuid: uuid(),
          startTime: eqSlideData.startTime,
          endTime: eqSlideData.endTime,
          type: eqSlideData.type,
          version: eqSlideData.version,
          template: eqSlideData.template || "",
          sortOrder: eqSlideData.sortOrder || 0,
          presentation: {
            connect: { id: presentationId },
          },
        },
      });
  
      // Create items if provided
      if (eqSlideData.items && eqSlideData.items.length > 0) {
        await this.createEqItems(prisma, eqSlide.id, eqSlideData.items);
      }
  
      return eqSlide;
    },
  
    // Create slide extra for a canvas slide
    async createSlideExtra(prisma, slideId, slideExtraData) {
      return await prisma.slideExtra.create({
        data: {
          type: slideExtraData.type || "background",
          color: slideExtraData.color || "gray",
          opacity: slideExtraData.opacity || 0.7,
          backgroundColor: slideExtraData.backgroundColor || "#363446",
          cellHeight: slideExtraData.cellHeight || 25,
          cellWidth: slideExtraData.cellWidth || 25,
          backgroundImage: slideExtraData.backgroundImage,
          showGrid: slideExtraData.showGrid || false,
          gridLineWidth: slideExtraData.gridLineWidth || 1,
          gridLineColor: slideExtraData.gridLineColor || "black",
          slide: {
            connect: { id: slideId },
          },
        },
      });
    },
  
    // Create a specific canvas item based on its type
    async createCanvasItem(prisma, slideId, item) {
      switch (item.type) {
        case "text":
          return await prisma.canvasText.create({
            data: {
              uuid: uuid(),
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              rotation: item.rotation || 0,
              text: item.text,
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              width: item.width,
              height: item.height,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "rectangle":
          return await prisma.canvasRectangle.create({
            data: {
              uuid: uuid(),
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              rotation: item.rotation || 0,
              width: item.width,
              height: item.height,
              filled: item.filled || false,
              lineWidth: item.lineWidth || 1,
              dash: item.dash || 0,
              gap: item.gap || 0,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "circle":
          return await prisma.canvasCircle.create({
            data: {
              uuid: uuid(),
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              radius: item.radius,
              startAngle: item.startAngle,
              endAngle: item.endAngle,
              lineWidth: item.lineWidth,
              dash: item.dash,
              gap: item.gap,
              filled: item.filled,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "line":
          return await prisma.canvasLine.create({
            data: {
              uuid: uuid(),
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              rotation: item.rotation || 0,
              x1: item.x1,
              y1: item.y1,
              x2: item.x2,
              y2: item.y2,
              lineWidth: item.lineWidth,
              dash: item.dash,
              gap: item.gap,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "ray":
          return await prisma.canvasRay.create({
            data: {
              uuid: uuid(),
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x1: item.x1,
              y1: item.y1,
              x2: item.x2,
              y2: item.y2,
              lineWidth: item.lineWidth,
              arrowWidth: item.arrowWidth,
              arrowHeight: item.arrowHeight,
              startArrow: item.startArrow,
              endArrow: item.endArrow,
              dash: item.dash,
              gap: item.gap,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        // Add cases for other item types as needed
        default:
          console.warn(`Unknown canvas item type: ${item.type}`);
          return null;
      }
    },
  
    // Create all canvas items for a slide
    async createCanvasItems(prisma, slideId, items) {
      const createdItems = [];
      for (const item of items) {
        const canvasItem = await this.createCanvasItem(prisma, slideId, item);
        if (canvasItem) {
          createdItems.push(canvasItem);
        }
      }
      return createdItems;
    },
  
    // Create a canvas slide with all its components
    async createCanvasSlide(prisma, presentationId, canvasSlideData) {
      const canvasSlide = await prisma.canvasSlide.create({
        data: {
          id: uuid(),
          uuid: uuid(),
          type: "canvas",
          sortOrder: canvasSlideData.sortOrder || 0,
          presentation: {
            connect: { id: presentationId },
          },
        },
      });
  
      // Create slideExtra if provided
      if (canvasSlideData.slideExtra) {
        await this.createSlideExtra(prisma, canvasSlide.id, canvasSlideData.slideExtra);
      }
  
      // Create canvas items if provided
      if (canvasSlideData.items && canvasSlideData.items.length > 0) {
        await this.createCanvasItems(prisma, canvasSlide.id, canvasSlideData.items);
      }
  
      return canvasSlide;
    },
  
    // Fetch the complete presentation with all related data
    async getCompletePresentation(prisma, presentationId) {
      return await prisma.presentation.findUnique({
        where: { id: presentationId },
        include: {
          eqSlides: {
            include: {
              items: {
                include: {
                  sps: true,
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
    }
  };
  
  module.exports  = presentationHelpers;