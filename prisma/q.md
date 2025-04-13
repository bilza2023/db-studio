
I have a mongodb data in json format that I want to convert into sqlite database. I have every thing ready and finally I want you to write me a node.js function that does this.

The data is in array of objects each object is a "presentation" which contains slides. slides can be of 2 types "canvas" and "eqs". 

For each presentation
1: we have to create the presentation
2: For "canvas" slides we have to 1: create canvas items 2: create slideExtra
3: For "eqs" we have to 1: create the slide 2: create eqItems and 3: create sp "solution points" 

==>(Important it is possible that there may not be any canvas slides in the data but we still need code for it) BUT concentrate more on eqs slides

==> some fields like imagesUrl,startTime , endTime are removed to keep that in mind

here is an example presentation from data

  {
    "id": "6779fd8c808e55c288cb54ce",
    "tcode": "fbise9math",
    "chapter": 2,
    "exercise": "2.1",
    "filename": "fbise9math2024_ch_2_ex_2.1_q_1",
    "questionNo": 1,
    "part": 0,
    "name": "",
    "questionType": "paid",
    "status": "empty",
    "tags": [],
    "sortOrder": 1,
    "comments": "",
    "slides": [
      {
        "id": "6779fd8c808e55c288cb54cf",
        "uuid": "a3064cc9-8ef9-4ae4-9d23-552059df9f59",
        "startTime": 0,
        "endTime": 10,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd8c808e55c288cb54d0",
            "uuid": "78c51066-d6b3-45f1-8226-4771c5b33525",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 20,
            "code": "Write the following in scientific notation.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d1",
            "uuid": "665a6608-e332-4591-81be-fbcb1c0b0dbe",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 20,
            "endTime": 51,
            "code": "Part 1 : 0.000 53407",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d2",
            "uuid": "4d5efd2e-e779-4845-8228-eeff8b32921a",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 51,
            "endTime": 77,
            "code": "0.000    53407",
            "type": "text",
            "sp": [
              {
                "code": "Move the decimal towards right and put it after the first non zero number",
                "type": "text"
              }
            ]
          },
          {
            "id": "6779fd8c808e55c288cb54d3",
            "uuid": "7938dc54-1a8a-4ffc-8ece-bb31c273ca7c",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 77,
            "endTime": 0,
            "code": "0.0005 # 3407",
            "type": "text",
            "sp": [
              {
                "code": "Count the number of digits between the original location of decimal and the new location.",
                "type": "text"
              },
              {
                "code": "In this case it is 4 towards right",
                "type": "heading"
              }
            ]
          },
          {
            "id": "6779fd8c808e55c288cb54d4",
            "uuid": "46750856-7271-45a0-8139-db3930798275",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 0,
            "endTime": 139,
            "code": "5.3407 * 10",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d5",
            "uuid": "e25010cc-dbbc-4a07-8862-9742d74175db",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 139,
            "endTime": 163,
            "code": "5.3407 * 10^4",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d6",
            "uuid": "6567a465-a49b-4d6e-a441-b847d8e62b0a",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 163,
            "endTime": 0,
            "code": "5.3407 * 10^{-4}",
            "type": "code",
            "sp": [
              {
                "code": "Why -4",
                "type": "heading"
              },
              {
                "code": "The original number was 0.xx the new number is 5.xx so when we return it to original form we need to make it smaller again hence the -4",
                "type": "text"
              }
            ]
          },
          {
            "id": "677e12873cc9ccd50a8d6b68",
            "uuid": "4972a193-ce27-4e73-8430-339a18080bc0",
            "name": "cbd9e2a1",
            "content": "",
            "showAt": 0,
            "hideAt": null,
            "startTime": 0,
            "endTime": 10,
            "code": "",
            "type": "txt",
            "sp": []
          }
        ]
      },
      {
        "id": "6779fd8c808e55c288cb54cf",
        "uuid": "a3064cc9-8ef9-4ae4-9d23-552059df9f59",
        "startTime": 10,
        "endTime": 20,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd8c808e55c288cb54d0",
            "uuid": "78c51066-d6b3-45f1-8226-4771c5b33525",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 10,
            "endTime": 20,
            "code": "Write the following in scientific notation.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d1",
            "uuid": "665a6608-e332-4591-81be-fbcb1c0b0dbe",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 20,
            "endTime": 0,
            "code": "Part (II) ",
            "type": "text",
            "sp": []
          },
          {
            "id": "677e12873cc9ccd50a8d6b6c",
            "uuid": "e72518ac-44f1-4eee-99e8-524dee688d61",
            "name": "2c0f5b0f",
            "content": "",
            "showAt": 0,
            "hideAt": null,
            "startTime": 0,
            "endTime": 0,
            "code": "53400000",
            "type": "txt",
            "sp": []
          },
          {
            "id": "677e12873cc9ccd50a8d6b6d",
            "uuid": "8b6f31d8-f699-4054-9900-cbc50ecfd79a",
            "name": "4e8453ad",
            "content": "",
            "showAt": 0,
            "hideAt": null,
            "startTime": 0,
            "endTime": 139,
            "code": "=5.34\\times10^7",
            "type": "code",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d5",
            "uuid": "e25010cc-dbbc-4a07-8862-9742d74175db",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 139,
            "endTime": 20,
            "code": "=5.34\\times10^7",
            "type": "code",
            "sp": []
          }
        ]
      },
      {
        "id": "6779fd8c808e55c288cb54cf",
        "uuid": "a3064cc9-8ef9-4ae4-9d23-552059df9f59",
        "startTime": 20,
        "endTime": 30,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd8c808e55c288cb54d0",
            "uuid": "78c51066-d6b3-45f1-8226-4771c5b33525",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 20,
            "endTime": 20,
            "code": "Write the following in scientific notation.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d1",
            "uuid": "665a6608-e332-4591-81be-fbcb1c0b0dbe",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 20,
            "endTime": 0,
            "code": "Part(III)",
            "type": "text",
            "sp": []
          },
          {
            "id": "677e12873cc9ccd50a8d6b72",
            "uuid": "83200fe1-011f-4887-8af4-50bb934bc02e",
            "name": "060aac32",
            "content": "",
            "showAt": 0,
            "hideAt": null,
            "startTime": 0,
            "endTime": 51,
            "code": "0.000000000012",
            "type": "txt",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d2",
            "uuid": "4d5efd2e-e779-4845-8228-eeff8b32921a",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 51,
            "endTime": 77,
            "code": "0.00000000001   2",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d3",
            "uuid": "7938dc54-1a8a-4ffc-8ece-bb31c273ca7c",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 77,
            "endTime": 30,
            "code": "1.2\\times 10^-{11}",
            "type": "text",
            "sp": []
          }
        ]
      },
      {
        "id": "6779fd8c808e55c288cb54cf",
        "uuid": "a3064cc9-8ef9-4ae4-9d23-552059df9f59",
        "startTime": 30,
        "endTime": 40,
        "type": "eqs",
        "version": "basic",
        "template": "",
        "imagesUrl": "https://taleem-media.blr1.cdn.digitaloceanspaces.com/bucket/",
        "items": [
          {
            "id": "6779fd8c808e55c288cb54d0",
            "uuid": "78c51066-d6b3-45f1-8226-4771c5b33525",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 30,
            "endTime": 20,
            "code": "Write the following in scientific notation.",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d1",
            "uuid": "665a6608-e332-4591-81be-fbcb1c0b0dbe",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 20,
            "endTime": 51,
            "code": "Part (IV)",
            "type": "text",
            "sp": []
          },
          {
            "id": "6779fd8c808e55c288cb54d2",
            "uuid": "4d5efd2e-e779-4845-8228-eeff8b32921a",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 51,
            "endTime": 77,
            "code": "2.5326",
            "type": "text",
            "sp": [
              {
                "code": "Move the decimal towards right and put it after the first non zero number",
                "type": "text"
              }
            ]
          },
          {
            "id": "6779fd8c808e55c288cb54d3",
            "uuid": "7938dc54-1a8a-4ffc-8ece-bb31c273ca7c",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 77,
            "endTime": 139,
            "code": "2.5326\\times 10^0",
            "type": "code",
            "sp": [
              {
                "code": "[[\"10^0=1\"]]",
                "type": "tableCode"
              }
            ]
          },
          {
            "id": "6779fd8c808e55c288cb54d5",
            "uuid": "e25010cc-dbbc-4a07-8862-9742d74175db",
            "name": "",
            "content": "",
            "showAt": 0,
            "hideAt": 0,
            "startTime": 139,
            "endTime": 40,
            "code": "",
            "type": "code",
            "sp": []
          }
        ]
      }
    ]
  },



  here are prism functions for this

const uuid = require("../../../uuid");

// Helper functions for creating presentation components
const presentationHelpers = {

    // Create a presentation record
    async createPresentation(prisma, presentationData) {
      // debugger;
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
  
    // Create an eq slide with all its items
    async createEqSlide(prisma, presentationId, eqSlideData) {
      const eqSlide = await prisma.eqSlide.create({
        data: {
          id: uuid(),
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
        await this.createEqItems(prisma, eqSlide.id, eqSlideData.items);
      }
  
      return eqSlide;
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
    // Create a canvas slide with all its components
    async createCanvasSlide(prisma, presentationId, canvasSlideData) {
      const canvasSlide = await prisma.canvasSlide.create({
        data: {
          id: uuid(),
          uuid: uuid(),
          type: "canvas",
          sortOrder: canvasSlideData.sortOrder || 0,
          period: canvasSlideData.period,
          sortOrder: canvasSlideData.sortOrder || 0,
          template: canvasSlideData.template || "",
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
    // Create slide extra for a canvas slide
    async createSlideExtra(prisma, slideId, slideExtraData) {
      return await prisma.slideExtra.create({
        data: {
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
    // Create a specific canvas item based on its type
// Create a specific canvas item based on its type
// Create a specific canvas item based on its type
    async createCanvasItem(prisma, slideId, item) {
      switch (item.type) {
        case "text":
          return await prisma.canvasText.create({
            data: {
              uuid: uuid(),
              type: "text",
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
              type: "rectangle",
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
              type: "circle",
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
              type: "line",
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
              type: "ray",
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
        case "image":
          return await prisma.canvasImage.create({
            data: {
              uuid: uuid(),
              type: "image",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color || "",
              x: item.x,
              y: item.y,
              rotation: item.rotation || 0,
              src: item.src,
              width: item.width,
              height: item.height,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "dot":
          return await prisma.canvasDot.create({
            data: {
              uuid: uuid(),
              type: "dot",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              labelX: item.labelX,
              labelY: item.labelY,
              label: item.label,
              radius: item.radius,
              textColor: item.textColor,
              textSize: item.textSize,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "ellipse":
          return await prisma.canvasEllipse.create({
            data: {
              uuid: uuid(),
              type: "ellipse",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              radiusX: item.radiusX,
              radiusY: item.radiusY,
              rotation: item.rotation,
              startAngle: item.startAngle,
              endAngle: item.endAngle,
              lineWidth: item.lineWidth,
              filled: item.filled,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "icon":
          return await prisma.canvasIcon.create({
            data: {
              uuid: uuid(),
              type: "icon",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              text: item.text,
              fontSize: item.fontSize,
              iconSize: item.iconSize,
              fontFamily: item.fontFamily,
              icon: item.icon,
              showBg: item.showBg,
              iconOnTop: item.iconOnTop,
              iconErrorX: item.iconErrorX,
              iconErrorY: item.iconErrorY,
              bgColor: item.bgColor,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "list":
        
          return await prisma.canvasList.create({
            data: {
              uuid: uuid(),
              type: "list",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              listArray: item.listArray,
              fontSize: item.fontSize,
              fontFamily: item.fontFamily,
              lineGap: item.lineGap,
              indentation: item.indentation,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "piechart":
          return await prisma.canvasPieChart.create({
            data: {
              uuid: uuid(),
              type: "piechart",
              name: item.name || "",
              opacity: item.opacity || 1,
              x: item.x,
              y: item.y,
              radius: item.radius,
              data: item.data,
              showLabels: item.showLabels,
              labelFontSize: item.labelFontSize,
              labelColor: item.labelColor,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "angle":
          return await prisma.canvasAngle.create({
            data: {
              uuid: uuid(),
              type: "angle",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x: item.x,
              y: item.y,
              radius: item.radius,
              ticks: item.ticks,
              startAngle: item.startAngle,
              endAngle: item.endAngle,
              lineWidth: item.lineWidth,
              showOrigin: item.showOrigin,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "sprite":
          return await prisma.canvasSprite.create({
            data: {
              uuid: uuid(),
              type: "sprite",
              name: item.name || "",
              opacity: item.opacity || 1,
              src: item.src,
              selectedItem: item.selectedItem,
              x: item.x,
              y: item.y,
              width: item.width,
              height: item.height,
              rotation: item.rotation,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        case "triangle":
          return await prisma.canvasTriangle.create({
            data: {
              uuid: uuid(),
              type: "triangle",
              name: item.name || "",
              opacity: item.opacity || 1,
              color: item.color,
              x1: item.x1,
              y1: item.y1,
              x2: item.x2,
              y2: item.y2,
              x3: item.x3,
              y3: item.y3,
              rotation: item.rotation,
              lineWidth: item.lineWidth,
              filled: item.filled,
              dash: item.dash,
              gap: item.gap,
              slide: {
                connect: { id: slideId },
              },
            },
          });
        default:
          console.warn(`Unknown canvas item type: ${item.type}`);
          return null;
      }
    }
  
};
  
  module.exports  = presentationHelpers;

  