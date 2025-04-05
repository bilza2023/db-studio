"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
/**
 * Basic Presentation Queries
 */
async function presentationQueries() {
    try {
        // Get all presentations
        const allPresentations = await prisma.presentation.findMany();
        // Get a specific presentation by ID
        const specificPresentation = await prisma.presentation.findUnique({
            where: { id: '6779fd29808e55c288cb3fd6' }
        });
        // Get presentations for a specific chapter
        const chapterPresentations = await prisma.presentation.findMany({
            where: { chapter: 1 }
        });
        // Get presentations for a specific exercise
        const exercisePresentations = await prisma.presentation.findMany({
            where: { exercise: '1.1' }
        });
        // Get presentations with pagination (useful for large datasets)
        const paginatedPresentations = await prisma.presentation.findMany({
            skip: 0,
            take: 10,
            orderBy: { sortOrder: 'asc' }
        });
        // Get presentations with filters
        const filteredPresentations = await prisma.presentation.findMany({
            where: {
                AND: [
                    { chapter: 1 },
                    { questionType: 'paid' },
                    { status: { not: 'empty' } }
                ]
            }
        });
        // Count presentations matching criteria
        const presentationCount = await prisma.presentation.count({
            where: { tcode: 'fbise10math' }
        });
        console.log(`Found ${presentationCount} presentations for tcode: fbise10math`);
    }
    catch (error) {
        console.error('Error in presentation queries:', error);
    }
}
/**
 * Queries with Slide Relationships
 */
async function slideRelationshipQueries() {
    try {
        // Get a presentation with its eq slides
        const presentationWithEqSlides = await prisma.presentation.findUnique({
            where: { id: '6779fd29808e55c288cb3fd6' },
            include: { eqSlides: true }
        });
        // Get a presentation with both eq slides and canvas slides
        const presentationWithAllSlides = await prisma.presentation.findUnique({
            where: { id: '6779fd29808e55c288cb3fd6' },
            include: {
                eqSlides: true,
                canvasSlides: true
            }
        });
        // Get presentations that have at least one eq slide
        const presentationsWithEqSlides = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    some: {} // At least one related record exists
                }
            }
        });
        // Get presentations with a specific number of eq slides
        const presentationsWithExactlyOneSlide = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    some: {}, // At least one slide exists
                }
            },
            include: {
                eqSlides: true,
                _count: {
                    select: { eqSlides: true }
                }
            },
            having: {
                eqSlides: {
                    count: {
                        equals: 1
                    }
                }
            }
        });
        // Alternative approach for counting related records
        const presentationsWithSlideCounts = await prisma.presentation.findMany({
            include: {
                _count: {
                    select: { eqSlides: true }
                }
            }
        });
        // Filter those with exactly one slide
        const filtered = presentationsWithSlideCounts.filter(p => p._count.eqSlides === 1);
    }
    catch (error) {
        console.error('Error in slide relationship queries:', error);
    }
}
/**
 * Complex Nested Queries
 */
async function complexNestedQueries() {
    try {
        // Get a presentation with all related data (deep nesting)
        const fullPresentation = await prisma.presentation.findUnique({
            where: { id: '6779fd29808e55c288cb3fd6' },
            include: {
                eqSlides: {
                    include: {
                        items: {
                            include: {
                                sps: true
                            }
                        }
                    }
                },
                canvasSlides: true
            }
        });
        // Get presentations where at least one slide has items with solution points
        const presentationsWithSolutions = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    some: {
                        items: {
                            some: {
                                sps: {
                                    some: {} // At least one sp exists
                                }
                            }
                        }
                    }
                }
            },
            include: {
                eqSlides: {
                    include: {
                        items: {
                            include: {
                                sps: true
                            }
                        }
                    }
                }
            }
        });
        // Get presentations where any item has a specific code pattern
        const presentationsWithEquation = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    some: {
                        items: {
                            some: {
                                code: {
                                    contains: 'x^2' // Items containing quadratic equations
                                }
                            }
                        }
                    }
                }
            }
        });
        // Get items containing specific mathematical notation across all presentations
        const itemsWithFractions = await prisma.eqItem.findMany({
            where: {
                code: {
                    contains: '\\frac' // Contains LaTeX fraction notation
                }
            },
            include: {
                slide: {
                    include: {
                        presentation: true
                    }
                }
            }
        });
    }
    catch (error) {
        console.error('Error in complex nested queries:', error);
    }
}
/**
 * Aggregation and Grouping Queries
 */
async function aggregationQueries() {
    try {
        // Count items per slide type
        const itemCountBySlideType = await prisma.eqSlide.groupBy({
            by: ['type'],
            _count: {
                items: true
            }
        });
        // Get average number of items per slide
        const allSlides = await prisma.eqSlide.findMany({
            include: {
                _count: {
                    select: { items: true }
                }
            }
        });
        const totalItems = allSlides.reduce((sum, slide) => sum + slide._count.items, 0);
        const averageItemsPerSlide = totalItems / allSlides.length;
        console.log(`Average items per slide: ${averageItemsPerSlide}`);
        // Find the presentation with the most slides
        const presentationsWithSlideCounts = await prisma.presentation.findMany({
            include: {
                _count: {
                    select: { eqSlides: true }
                }
            }
        });
        const maxSlideCount = Math.max(...presentationsWithSlideCounts.map(p => p._count.eqSlides));
        const presentationsWithMostSlides = presentationsWithSlideCounts.filter(p => p._count.eqSlides === maxSlideCount);
    }
    catch (error) {
        console.error('Error in aggregation queries:', error);
    }
}
/**
 * Custom Filtering Queries
 */
async function customFilteringQueries() {
    try {
        // Find presentations where all items are of text type
        const presentationsWithAllTextItems = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    every: {
                        items: {
                            every: {
                                type: 'text'
                            }
                        }
                    }
                }
            }
        });
        // Find presentations that have mixed item types
        const presentationsWithMixedItemTypes = await prisma.presentation.findMany({
            where: {
                eqSlides: {
                    some: {
                        items: {
                            some: {
                                type: 'text'
                            }
                        },
                        AND: [
                            {
                                items: {
                                    some: {
                                        type: 'code'
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        });
        // Find items with solution points that have code-type SPs
        const itemsWithCodeSolutions = await prisma.eqItem.findMany({
            where: {
                sps: {
                    some: {
                        type: 'code'
                    }
                }
            },
            include: {
                sps: true
            }
        });
        // Find presentations by exercise pattern using regex-like queries
        const algebra2Presentations = await prisma.presentation.findMany({
            where: {
                exercise: {
                    startsWith: '2.' // All exercises in chapter 2
                }
            }
        });
    }
    catch (error) {
        console.error('Error in custom filtering queries:', error);
    }
}
/**
 * Advanced Selection and Projection
 */
async function advancedSelectionQueries() {
    try {
        // Select only specific fields from presentations
        const presentationSummaries = await prisma.presentation.findMany({
            select: {
                id: true,
                tcode: true,
                chapter: true,
                exercise: true,
                questionNo: true
            }
        });
        // Get presentation IDs and their slide counts
        const presentationSlideCounts = await prisma.presentation.findMany({
            select: {
                id: true,
                filename: true,
                _count: {
                    select: {
                        eqSlides: true
                    }
                }
            }
        });
        // Complex projection: Get presentations with their first slide and first item only
        const presentationsWithFirstItems = await prisma.presentation.findMany({
            include: {
                eqSlides: {
                    take: 1, // Only the first slide
                    orderBy: {
                        sortOrder: 'asc'
                    },
                    include: {
                        items: {
                            take: 1, // Only the first item
                            orderBy: {
                                sortOrder: 'asc'
                            }
                        }
                    }
                }
            }
        });
        // Get items with their complete path information (presentation > slide > item)
        const itemsWithContext = await prisma.eqItem.findMany({
            take: 10,
            include: {
                slide: {
                    include: {
                        presentation: {
                            select: {
                                tcode: true,
                                chapter: true,
                                exercise: true,
                                questionNo: true
                            }
                        }
                    }
                }
            }
        });
    }
    catch (error) {
        console.error('Error in advanced selection queries:', error);
    }
}
/**
 * Raw Database Queries (when you need something Prisma doesn't support directly)
 */
async function rawDatabaseQueries() {
    try {
        // Execute a raw SQL query (SQLite syntax)
        const result = await prisma.$queryRaw `
      SELECT 
        p.id as presentation_id,
        p.tcode,
        p.chapter,
        p.exercise,
        COUNT(DISTINCT s.id) as slide_count,
        COUNT(DISTINCT i.id) as item_count
      FROM "Presentation" p
      LEFT JOIN "EqSlide" s ON p.id = s.presentationId
      LEFT JOIN "EqItem" i ON s.id = i.slideId
      GROUP BY p.id, p.tcode, p.chapter, p.exercise
      ORDER BY item_count DESC
      LIMIT 10
    `;
        console.log('Top 10 presentations by item count:', result);
    }
    catch (error) {
        console.error('Error in raw database queries:', error);
    }
}
/**
 * Run all query examples
 */
async function runAllExamples() {
    try {
        await presentationQueries();
        await slideRelationshipQueries();
        await complexNestedQueries();
        await aggregationQueries();
        await customFilteringQueries();
        await advancedSelectionQueries();
        await rawDatabaseQueries();
        console.log('All query examples completed successfully!');
    }
    catch (error) {
        console.error('Error running query examples:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
