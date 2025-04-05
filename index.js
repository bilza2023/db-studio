// const prisma = require("@prisma/client");
// const fs = require('node:fs/promises');

// const outputFilePath = 'queryResults.js';

// /**
//  * Basic Presentation Queries
//  */
// async function presentationQueries() {
//   const results = {};
//   try {
//     // Get all presentations
//     const allPresentations = await prisma.presentation.findMany();
//     results.allPresentations = allPresentations;

//     // Get a specific presentation by ID
//     const specificPresentation = await prisma.presentation.findUnique({
//       where: { id: '6779fd29808e55c288cb3fd6' },
//     });
//     results.specificPresentation = specificPresentation;

//     // Get presentations for a specific chapter
//     const chapterPresentations = await prisma.presentation.findMany({
//       where: { chapter: 1 },
//     });
//     results.chapterPresentations = chapterPresentations;

//     // Get presentations for a specific exercise
//     const exercisePresentations = await prisma.presentation.findMany({
//       where: { exercise: '1.1' },
//     });
//     results.exercisePresentations = exercisePresentations;

//     // Get presentations with pagination (useful for large datasets)
//     const paginatedPresentations = await prisma.presentation.findMany({
//       skip: 0,
//       take: 10,
//       orderBy: { sortOrder: 'asc' },
//     });
//     results.paginatedPresentations = paginatedPresentations;

//     // Get presentations with filters
//     const filteredPresentations = await prisma.presentation.findMany({
//       where: {
//         AND: [
//           { chapter: 1 },
//           { questionType: 'paid' },
//           { status: { not: 'empty' } },
//         ],
//       },
//     });
//     results.filteredPresentations = filteredPresentations;

//     // Count presentations matching criteria
//     const presentationCount = await prisma.presentation.count({
//       where: { tcode: 'fbise10math' },
//     });
//     results.presentationCount = presentationCount;
//     console.log(`Found ${presentationCount} presentations for tcode: fbise10math`);

//     return results;
//   } catch (error) {
//     console.error('Error in presentation queries:', error);
//     return { error: error.message };
//   }
// }

// async function writeResultsToFile(data, filePath) {
//   try {
//     const jsonData = JSON.stringify(data, null, 2); // Use JSON.stringify for better readability
//     await fs.writeFile(filePath, `export const queryResults = ${jsonData};`, 'utf-8');
//     console.log(`Query results written to ${filePath}`);
//   } catch (error) {
//     console.error('Error writing to file:', error);
//   } finally {
//     await prisma.$disconnect(); // Disconnect Prisma client when done
//   }
// }

// async function main() {
//   const results = await presentationQueries();
//   await writeResultsToFile(results, outputFilePath);
// }

// main();