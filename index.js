
// const { PrismaClient } = require("@prisma/client");
const PresentationModel = require("./src/models/presentationModel/PresentationModel");
const express = require("express");
const cors = require("cors"); 

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Root endpoint
app.get("/", async(req, res) => {
  debugger;
  return res.json({ message: "Welcome To Prisma ApI" }).status(200);
});

// Health check endpoint
app.get("/ping", async (req, res) => {
  try {
    // const count = await prisma.presentation.count();
    const count = 999;
    return res.json({ message: "pong", count }).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
// Health check endpoint
app.get("/create", async (req, res) => {
  try {
    // debugger;
    const createResult = await PresentationModel.create(req,res);

    return res.json({ message: "created", createResult }).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.get("/read/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const presentation = await PresentationModel.read(id);

    return res.json(presentation).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
app.post("/update", async (req, res) => {
  try {
    // const { id } = req.params;
    // const presentation = await PresentationModel.read(id);

    return res.json({message : "success"}).status(200);
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
    const deleteResult = await PresentationModel.del(req,res);

    return res.json({ message: "deleted", deleteResult }).status(200);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.listen(port, () => {
  console.log(`Presentations API running on port ${port}`);
});

module.exports = app;