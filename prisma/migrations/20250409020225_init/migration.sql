/*
  Warnings:

  - You are about to drop the column `endTime` on the `CanvasSlide` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `CanvasSlide` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `EqSlide` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `EqSlide` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanvasSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'canvas',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "period" INTEGER DEFAULT 10,
    "template" TEXT,
    "presentationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasSlide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasSlide" ("createdAt", "id", "name", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid") SELECT "createdAt", "id", "name", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid" FROM "CanvasSlide";
DROP TABLE "CanvasSlide";
ALTER TABLE "new_CanvasSlide" RENAME TO "CanvasSlide";
CREATE UNIQUE INDEX "CanvasSlide_uuid_key" ON "CanvasSlide"("uuid");
CREATE TABLE "new_EqSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "period" INTEGER DEFAULT 10,
    "type" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "template" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "presentationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EqSlide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EqSlide" ("createdAt", "id", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid", "version") SELECT "createdAt", "id", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid", "version" FROM "EqSlide";
DROP TABLE "EqSlide";
ALTER TABLE "new_EqSlide" RENAME TO "EqSlide";
CREATE UNIQUE INDEX "EqSlide_uuid_key" ON "EqSlide"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
