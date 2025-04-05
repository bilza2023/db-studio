
Here is my prism schema and my router that i got made by you

Requirement:
===========
I simply want to create a new presentation (including all its slide types). I mean that i want to create a presentation with 2 slides 1: eqSlide(with its items and sp items) and 2: canvasSlide. the canvas slide to have its items and slideExtra 

write me a simple function / route that takes in the data and create a new presentation.
explain the incomming data to me or provide the fake data .
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
  type              String    @default("background")
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
model CanvasRectangle {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("rectangle")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  x           Float
  y           Float
  rotation    Float     @default(0)
  
  // Rectangle-specific fields
  width       Float
  height      Float
  filled      Boolean   @default(false)
  lineWidth   Float     @default(1)
  dash        Float     @default(0)
  gap         Float     @default(0)
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasCircle {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("circle")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  x           Float
  y           Float
  
  // Circle-specific fields
  radius      Float
  startAngle  Float
  endAngle    Float
  lineWidth   Float
  dash        Float
  gap         Float
  filled      Boolean
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasImage {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("image")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String    @default("")
  x           Float
  y           Float
  rotation    Float     @default(0)
  
  // Image-specific fields
  src         String
  width       Float
  height      Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasLine {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("line")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  rotation    Float     @default(0)
  
  // Line-specific fields
  x1          Float
  y1          Float
  x2          Float
  y2          Float
  lineWidth   Float
  dash        Float
  gap         Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasRay {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("ray")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Ray-specific fields
  x1          Float
  y1          Float
  x2          Float
  y2          Float
  lineWidth   Float
  arrowWidth  Float
  arrowHeight Float
  startArrow  Boolean
  endArrow    Boolean
  dash        Float
  gap         Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasDot {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("dot")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Dot-specific fields
  x           Float
  y           Float
  label       String
  radius      Float
  textColor   String
  textSize    Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasEllipse {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("ellipse")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Ellipse-specific fields
  x           Float
  y           Float
  radiusX     Float
  radiusY     Float
  rotation    Float
  startAngle  Float
  endAngle    Float
  lineWidth   Float
  filled      Boolean
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasIcon {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("icon")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Icon-specific fields
  x           Float
  y           Float
  text        String
  fontSize    Float
  iconSize    Float
  fontFamily  String
  icon        String
  showBg      Boolean
  iconOnTop   Boolean
  iconErrorX  Float
  iconErrorY  Float
  bgColor     String
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasList {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("list")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // List-specific fields
  x           Float
  y           Float
  listItems   String    // Stored as JSON array string
  fontSize    Float
  fontFamily  String
  lineGap     Float
  indentation Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasPieChart {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("piechart")
  name        String    @default("")
  opacity     Float     @default(1)
  
  // PieChart-specific fields
  x           Float
  y           Float
  radius      Float
  chartData   String    // Stored as JSON string for data array
  showLabels  Boolean
  labelFontSize Float
  labelColor  String
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasAngle {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("angle")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Angle-specific fields
  x           Float
  y           Float
  radius      Float
  ticks       Int
  startAngle  Float
  endAngle    Float
  lineWidth   Float
  showOrigin  Boolean
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasSprite {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("sprite")
  name        String    @default("")
  opacity     Float     @default(1)
  
  // Sprite-specific fields
  src         String
  selectedItem String
  x           Float
  y           Float
  width       Float
  height      Float
  rotation    Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
model CanvasTriangle {
  id          String    @id @default(cuid())
  uuid        String    @unique
  type        String    @default("triangle")
  name        String    @default("")
  opacity     Float     @default(1)
  color       String
  
  // Triangle-specific fields
  x1          Float
  y1          Float
  x2          Float
  y2          Float
  x3          Float
  y3          Float
  rotation    Float
  lineWidth   Float
  filled      Boolean
  dash        Float
  gap         Float
  
  // Relationship to parent slide
  slide       CanvasSlide  @relation(fields: [slideId], references: [id], onDelete: Cascade)
  slideId     String
  
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


const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(express.json());

// Root endpoint
app.get("/", async(req, res) => {
  // // async function deleteAllCanvasSlides(prisma: PrismaClient) {
  //   try {
  //     const deletedCanvasSlides = await prisma.canvasSlide.deleteMany({});

  //   return res.json({ message: `Successfully deleted ${deletedCanvasSlides.count} CanvasSlide(s).` }).status(200);
  //   } catch (error) {
  //     console.error("Error deleting CanvasSlides:", error);
  //   }
  
});

// Health check endpoint
app.get("/ping", async (req, res) => {
  try {
    const count = await prisma.presentation.count();
    return res.json({ message: "pong", count }).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==================== PRESENTATION ENDPOINTS ====================

// Create a new presentation
app.post("/presentations", async (req, res) => {
  try {
    const {
      tcode,
      chapter,
      exercise,
      filename,
      questionNo,
      part,
      name,
      questionType,
      status,
      sortOrder,
      comments,
      tags,
    } = req.body;

    const presentation = await prisma.presentation.create({
      data: {
        id: uuidv4(),
        tcode,
        chapter,
        exercise,
        filename,
        questionNo,
        part,
        name: name || "",
        questionType,
        status,
        sortOrder: sortOrder || 0,
        comments: comments || "",
        tags: tags || "[]",
      },
    });

    return res.status(201).json(presentation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all presentations with pagination
app.get("/presentations", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, questionType } = req.query;
    const skip = (page - 1) * limit;

    // Build filter object
    const where = {};
    if (status) where.status = status;
    if (questionType) where.questionType = questionType;

    const presentations = await prisma.presentation.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy: { createdAt: "desc" },
      include: {
        // Include count of related slides
        _count: {
          select: {
            eqSlides: true,
            canvasSlides: true,
          },
        },
      },
    });

    const total = await prisma.presentation.count({ where });

    return res.json({
      data: presentations,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get presentation by ID with all related data
app.get("/presentations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const presentation = await prisma.presentation.findUnique({
      where: { id },
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
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    return res.json(presentation);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a presentation
app.put("/presentations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      tcode,
      chapter,
      exercise,
      filename,
      questionNo,
      part,
      name,
      questionType,
      status,
      sortOrder,
      comments,
      tags,
    } = req.body;

    // Check if presentation exists
    const exists = await prisma.presentation.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    const updatedPresentation = await prisma.presentation.update({
      where: { id },
      data: {
        tcode,
        chapter,
        exercise,
        filename,
        questionNo,
        part,
        name,
        questionType,
        status,
        sortOrder,
        comments,
        tags,
      },
    });

    return res.json(updatedPresentation);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a presentation
app.delete("/presentations/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if presentation exists
    const exists = await prisma.presentation.findUnique({
      where: { id },
    });

    if (!exists) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    // Delete the presentation (cascades to related slides)
    await prisma.presentation.delete({
      where: { id },
    });

    return res.json({ message: "Presentation deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==================== EQ SLIDE ENDPOINTS ====================

// Create a new eq slide for a presentation
app.post("/presentations/:presentationId/eq-slides", async (req, res) => {
  try {
    const { presentationId } = req.params;
    const { startTime, endTime, type, version, template, sortOrder } = req.body;

    // Check if presentation exists
    const presentation = await prisma.presentation.findUnique({
      where: { id: presentationId },
    });

    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    const eqSlide = await prisma.eqSlide.create({
      data: {
        id: uuidv4(),
        uuid: uuidv4(),
        startTime,
        endTime,
        type,
        version,
        template: template || "",
        sortOrder: sortOrder || 0,
        presentation: {
          connect: { id: presentationId },
        },
      },
    });

    return res.status(201).json(eqSlide);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Update an eq slide
app.put("/eq-slides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, type, version, template, sortOrder } = req.body;

    const updatedSlide = await prisma.eqSlide.update({
      where: { id },
      data: {
        startTime,
        endTime,
        type,
        version,
        template,
        sortOrder,
      },
    });

    return res.json(updatedSlide);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete an eq slide
app.delete("/eq-slides/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.eqSlide.delete({
      where: { id },
    });

    return res.json({ message: "EqSlide deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==================== CANVAS SLIDE ENDPOINTS ====================

// Create a new canvas slide for a presentation
app.post("/presentations/:presentationId/canvas-slides", async (req, res) => {
  try {
    const { presentationId } = req.params;
    const { sortOrder } = req.body;

    // Check if presentation exists
    const presentation = await prisma.presentation.findUnique({
      where: { id: presentationId },
    });

    if (!presentation) {
      return res.status(404).json({ error: "Presentation not found" });
    }

    const canvasSlide = await prisma.canvasSlide.create({
      data: {
        id: uuidv4(),
        uuid: uuidv4(),
        type: "canvas",
        sortOrder: sortOrder || 0,
        presentation: {
          connect: { id: presentationId },
        },
      },
    });

    return res.status(201).json(canvasSlide);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Update a canvas slide
app.put("/canvas-slides/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { sortOrder } = req.body;

    const updatedSlide = await prisma.canvasSlide.update({
      where: { id },
      data: {
        sortOrder,
      },
    });

    return res.json(updatedSlide);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a canvas slide
app.delete("/canvas-slides/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.canvasSlide.delete({
      where: { id },
    });

    return res.json({ message: "CanvasSlide deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==================== EQ ITEM ENDPOINTS ====================

// Create a new eq item for a slide
app.post("/eq-slides/:slideId/items", async (req, res) => {
  try {
    const { slideId } = req.params;
    const {
      name,
      content,
      showAt,
      hideAt,
      startTime,
      endTime,
      code,
      type,
      sortOrder,
    } = req.body;

    // Check if slide exists
    const slide = await prisma.eqSlide.findUnique({
      where: { id: slideId },
    });

    if (!slide) {
      return res.status(404).json({ error: "EqSlide not found" });
    }

    const eqItem = await prisma.eqItem.create({
      data: {
        id: uuidv4(),
        uuid: uuidv4(),
        name: name || "",
        content: content || "",
        showAt,
        hideAt,
        startTime,
        endTime,
        code: code || "",
        type,
        sortOrder: sortOrder || 0,
        slide: {
          connect: { id: slideId },
        },
      },
    });

    return res.status(201).json(eqItem);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Update an eq item
app.put("/eq-items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      content,
      showAt,
      hideAt,
      startTime,
      endTime,
      code,
      type,
      sortOrder,
    } = req.body;

    const updatedItem = await prisma.eqItem.update({
      where: { id },
      data: {
        name,
        content,
        showAt,
        hideAt,
        startTime,
        endTime,
        code,
        type,
        sortOrder,
      },
    });

    return res.json(updatedItem);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete an eq item
app.delete("/eq-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.eqItem.delete({
      where: { id },
    });

    return res.json({ message: "EqItem deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// ==================== SP ENDPOINTS ====================

// Create a new solution point for an eq item
app.post("/eq-items/:itemId/sps", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { code, type, sortOrder } = req.body;

    // Check if item exists
    const item = await prisma.eqItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return res.status(404).json({ error: "EqItem not found" });
    }

    const sp = await prisma.sp.create({
      data: {
        code,
        type,
        sortOrder: sortOrder || 0,
        item: {
          connect: { id: itemId },
        },
      },
    });

    return res.status(201).json(sp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Update a solution point
app.put("/sps/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { code, type, sortOrder } = req.body;

    const updatedSp = await prisma.sp.update({
      where: { id },
      data: {
        code,
        type,
        sortOrder,
      },
    });

    return res.json(updatedSp);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Delete a solution point
app.delete("/sps/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.sp.delete({
      where: { id },
    });

    return res.json({ message: "Solution point deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Presentations API running on port ${port}`);
});

module.exports = app;

