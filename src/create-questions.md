
I have a problem while writing to my sqlite database using prisma.

1: The "slideExtra" of "canvasSlide" does not get writtem to the db , actually there is not even a table for this, where there there should be a 1-1 relationship table for CanvasSlide
 may be this is the reason in prisma schema

  // Relationship to slideExtra (1-to-1)
  slideExtra    SlideExtra?
  
2: The sp of the eq slide does not get written also 

they also have missing relationship 


  // Relationship to solution points
  sps         Sp[]

data which needs to be written



const presentation={

"presentationData": {
    tcode: "newTcode",
    chapter: 1,
    exercise: "99.99",
    filename: "thisisanewname",
    questionNo: 22,
    part: 333,
    name: "somename",
    questionType: "free",
    status: "final",
    sortOrder: 0,
    comments: "sss",
    tags: "",
},
"eqSlidesData" : [
    {
      startTime : 0,
      endTime : 10,
      type : "eqs",
      version : "basic",
      template : "",
      sortOrder : 0,
      items : [
        {
          name: "ccc",
          content: "ssss",
          showAt: 0,
          hideAt: 0,
          startTime: 0,
          endTime: 10,
          code: "This is text",
          type: "text",
          sortOrder: 0,
          sp: [
            [{code:"baloons.png",type:"image",sortOrder: 0}]
          ],
          
        }
      ]
    }
  ],
  
"canvasSlidesData" : [{
        uuid: "31ce5b05-a8a3-43c3-b473-cddab5b978f6",
        startTime: 0,
        endTime: 10,
        type: "canvas",
        version: "basic",
        template: "",
        items: [
          {
            name: "cxcx",
            opacity: 1,
            type: "text",
            color: "red",
            x: 200,
            y: 200,
            rotation: 0,
            text: "This is the text",
            fontSize: 30,
            fontFamily: "Arial",
            width: 40,
            height: 100,
          }
        ],
        slideExtra: {
          backgroundColor: "#edece9",
          color: "#edece9",
          opacity: 1,
          canvasWidth: 1000,
          canvasHeight: 360,
          cellHeight: 25,
          cellWidth: 25,
          backgroundImage: "black_mat",
          showGrid: false,
          gridLineWidth: 1,
          gridLineColor: "gray",
        }
  }]

}//presentationData

module.exports = presentation

Prisma Schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
// Main presentation model (top level content)
model Presentation {
  id           String   @id
  tcode        String
  chapter      Int
  exercise     String
  filename     String
  questionNo   Int
  part         Int
  name         String   @default("")
  questionType String
  status       String
  sortOrder    Int      @default(0)
  comments     String   @default("")
  tags         String   @default("[]") // Stored as JSON string
  
  // Relationships to slides
  eqSlides     EqSlide[]
  canvasSlides CanvasSlide[]
  
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
// EqSlide model for equation slides
model EqSlide {
  id          String    @id
  uuid        String    @unique
  startTime   Int
  endTime     Int
  type        String
  version     String
  template    String    @default("")
  sortOrder   Int       @default(0) 
  
  // Relationship to parent presentation
  presentation   Presentation @relation(fields: [presentationId], references: [id], onDelete: Cascade)
  presentationId String
  
  // Relationship to items
  items       EqItem[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
// EqItem model for items within equation slides
model EqItem {
  id          String    @id
  uuid        String    @unique
  name        String    @default("")
  content     String    @default("")
  showAt      Int
  hideAt      Int
  startTime   Int
  endTime     Int
  code        String    @default("")
  type        String
  sortOrder   Int       @default(0)
  
  // Relationship to parent slide
  slide       EqSlide   @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  // Relationship to solution points
  sps         Sp[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
// Solution Points (sp) model
model Sp {
  id          String    @id @default(cuid())
  code        String
  type        String
  sortOrder   Int       @default(0)
  
  // Relationship to parent item
  item        EqItem    @relation(fields: [itemId], references: [id], onDelete: Cascade)
  itemId      String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// Canvas slide model 
model CanvasSlide {
  id              String    @id
  uuid            String    @unique
  type            String    @default("canvas")
  sortOrder       Int       @default(0)
  
  // Relationship to parent presentation  
  presentation   Presentation @relation(fields: [presentationId], references: [id], onDelete: Cascade)
  presentationId String
  
  // Relationship to slideExtra (1-to-1)
  slideExtra    SlideExtra?
  
  // Relationships to canvas items
  textItems      CanvasText[]
  rectangleItems CanvasRectangle[]
  circleItems    CanvasCircle[]
  imageItems     CanvasImage[]
  lineItems      CanvasLine[]
  rayItems       CanvasRay[]
  dotItems       CanvasDot[]
  ellipseItems   CanvasEllipse[]
  iconItems      CanvasIcon[]
  listItems      CanvasList[]
  pieChartItems  CanvasPieChart[]
  angleItems     CanvasAngle[]
  spriteItems    CanvasSprite[]
  triangleItems  CanvasTriangle[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
// SlideExtra model (1-to-1 relationship with CanvasSlide)
model SlideExtra {
  id                String    @id @default(cuid())
  color             String    @default("gray")
  opacity           Float     @default(0.7)
  backgroundColor   String    @default("#363446")
  cellHeight        Float     @default(25)
  cellWidth         Float     @default(25)
  backgroundImage   String?
  showGrid          Boolean   @default(false)
  gridLineWidth     Float     @default(1)
  gridLineColor     String    @default("black")
  
  // Relationship to canvas slide (1-to-1)
  slide             CanvasSlide @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId           String      @unique // This makes it a 1-to-1 relationship
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
// Base fields for all canvas items
// Note: These are common fields shared across all item types
model CanvasText {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("text")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  x           Float
  y           Float
  rotation    Float     @default(0)
  
  // Text-specific fields
  text        String
  fontSize    Float
  fontFamily  String
  width       Float
  height      Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

please do lot of explaining and just give me code that needs to be changed 
