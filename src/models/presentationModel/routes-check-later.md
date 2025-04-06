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

