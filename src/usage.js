// ================= USAGE EXAMPLES =================

// 1. Creating a new presentation
// POST /presentations
const newPresentationData = {
    "tcode": "MATH101",
    "chapter": 3,
    "exercise": "Ex-3.2",
    "filename": "quadratic_equations.pptx",
    "questionNo": 5,
    "part": 2,
    "name": "Solving Quadratic Equations",
    "questionType": "problem",
    "status": "active",
    "sortOrder": 1,
    "comments": "Needs better visuals",
    "tags": JSON.stringify(["algebra", "quadratic", "equations"])
  };
  
  // 2. Getting all presentations with pagination and filters
  // GET /presentations?page=1&limit=10&status=active&questionType=problem
  
  // 3. Getting a specific presentation with all related data
  // GET /presentations/some-uuid-here
  
  // 4. Updating a presentation
  // PUT /presentations/some-uuid-here
  const updatedPresentationData = {
    "tcode": "MATH101",
    "chapter": 3,
    "exercise": "Ex-3.2",
    "filename": "quadratic_equations_revised.pptx",
    "questionNo": 5,
    "part": 2,
    "name": "Advanced Quadratic Equations",
    "questionType": "problem",
    "status": "published",
    "sortOrder": 1,
    "comments": "Visuals improved",
    "tags": JSON.stringify(["algebra", "quadratic", "equations", "advanced"])
  };
  
  // 5. Creating an EqSlide for a presentation
  // POST /presentations/some-uuid-here/eq-slides
  const newEqSlideData = {
    "startTime": 0,
    "endTime": 10000,
    "type": "equation",
    "version": "1.0",
    "template": "standard",
    "sortOrder": 1
  };
  
  // 6. Creating a CanvasSlide for a presentation
  // POST /presentations/some-uuid-here/canvas-slides
  const newCanvasSlideData = {
    "sortOrder": 2
  };
  
  // 7. Creating an EqItem for an EqSlide
  // POST /eq-slides/some-slide-uuid-here/items
  const newEqItemData = {
    "name": "Quadratic Formula",
    "content": "x = (-b ± √(b^2-4ac))/(2a)",
    "showAt": 1000,
    "hideAt": 9000,
    "startTime": 1000,
    "endTime": 9000,
    "code": "quadratic-formula",
    "type": "equation",
    "sortOrder": 1
  };
  
  // 8. Creating a Solution Point for an EqItem
  // POST /eq-items/some-item-uuid-here/sps
  const newSpData = {
    "code": "solution-step-1",
    "type": "step",
    "sortOrder": 1
  };
  
  // 9. Complete example of creating a presentation with slides, items, and solution points
  async function createCompletePresentation() {
    try {
      // 1. Create a presentation
      const presentationResponse = await fetch('http://localhost:5000/presentations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "tcode": "MATH101",
          "chapter": 3,
          "exercise": "Ex-3.2",
          "filename": "quadratic_equations.pptx",
          "questionNo": 5,
          "part": 2,
          "name": "Solving Quadratic Equations",
          "questionType": "problem",
          "status": "active",
          "tags": JSON.stringify(["algebra", "quadratic", "equations"])
        })
      });
      
      const presentation = await presentationResponse.json();
      const presentationId = presentation.id;
      
      // 2. Add an equation slide
      const eqSlideResponse = await fetch(`http://localhost:5000/presentations/${presentationId}/eq-slides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "startTime": 0,
          "endTime": 10000,
          "type": "equation",
          "version": "1.0",
          "template": "standard",
          "sortOrder": 1
        })
      });
      
      const eqSlide = await eqSlideResponse.json();
      const slideId = eqSlide.id;
      
      // 3. Add a canvas slide
      await fetch(`http://localhost:5000/presentations/${presentationId}/canvas-slides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "sortOrder": 2
        })
      });
      
      // 4. Add an equation item to the equation slide
      const eqItemResponse = await fetch(`http://localhost:5000/eq-slides/${slideId}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "name": "Quadratic Formula",
          "content": "x = (-b ± √(b^2-4ac))/(2a)",
          "showAt": 1000,
          "hideAt": 9000,
          "startTime": 1000,
          "endTime": 9000,
          "code": "quadratic-formula",
          "type": "equation",
          "sortOrder": 1
        })
      });
      
      const eqItem = await eqItemResponse.json();
      const itemId = eqItem.id;
      
      // 5. Add solution points to the equation item
      await fetch(`http://localhost:5000/eq-items/${itemId}/sps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "code": "identify-variables",
          "type": "step",
          "sortOrder": 1
        })
      });
      
      await fetch(`http://localhost:5000/eq-items/${itemId}/sps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "code": "apply-formula",
          "type": "step",
          "sortOrder": 2
        })
      });
      
      console.log(`Successfully created presentation with ID: ${presentationId}`);
      
      // 6. Retrieve the complete presentation with all related data
      const getCompleteResponse = await fetch(`http://localhost:5000/presentations/${presentationId}`);
      const completePresentation = await getCompleteResponse.json();
      console.log(JSON.stringify(completePresentation, null, 2));
      
    } catch (error) {
      console.error('Error creating presentation:', error);
    }
  }
  
  // Example seed script to populate the database with fake data
  async function seedDatabase() {
    const prisma = new PrismaClient();
    
    try {
      // Create a presentation
      const presentation1 = await prisma.presentation.create({
        data: {
          id: "pres-" + Date.now(),
          tcode: "PHYS102",
          chapter: 5,
          exercise: "Ex-5.3",
          filename: "newton_laws.pptx",
          questionNo: 3,
          part: 1,
          name: "Newton's Laws of Motion",
          questionType: "concept",
          status: "active",
          tags: JSON.stringify(["physics", "newton", "laws", "motion"]),
          eqSlides: {
            create: [
              {
                id: "slide-eq-1",
                uuid: "slide-eq-uuid-1",
                startTime: 0,
                endTime: 15000,
                type: "equation",
                version: "1.0",
                template: "standard",
                sortOrder: 1,
                items: {
                  create: [
                    {
                      id: "item-1",
                      uuid: "item-uuid-1",
                      name: "First Law",
                      content: "F = 0 → a = 0",
                      showAt: 1000,
                      hideAt: 14000,
                      startTime: 1000,
                      endTime: 14000,
                      code: "first-law",
                      type: "equation",
                      sortOrder: 1,
                      sps: {
                        create: [
                          {
                            code: "explain-inertia",
                            type: "explanation",
                            sortOrder: 1
                          }
                        ]
                      }
                    },
                    {
                      id: "item-2",
                      uuid: "item-uuid-2",
                      name: "Second Law",
                      content: "F = ma",
                      showAt: 3000,
                      hideAt: 14000,
                      startTime: 3000,
                      endTime: 14000,
                      code: "second-law",
                      type: "equation",
                      sortOrder: 2,
                      sps: {
                        create: [
                          {
                            code: "explain-acceleration",
                            type: "explanation",
                            sortOrder: 1
                          }
                        ]
                      }
                    }
                  ]
                }
              }
            ]
          },
          canvasSlides: {
            create: [
              {
                id: "slide-canvas-1",
                uuid: "slide-canvas-uuid-1",
                type: "canvas",
                sortOrder: 2
              }
            ]
          }
        }
      });
      
      console.log("Database seeded successfully!");
      console.log("Created presentation:", presentation1);
      
    } catch (error) {
      console.error("Error seeding database:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  // Call seedDatabase() to populate your database with example data