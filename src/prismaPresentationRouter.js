
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Presentations API" }).status(200);
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