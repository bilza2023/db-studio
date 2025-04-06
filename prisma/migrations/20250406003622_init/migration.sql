/*
  Warnings:

  - You are about to drop the column `type` on the `SlideExtra` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SlideExtra" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT NOT NULL DEFAULT 'gray',
    "opacity" REAL NOT NULL DEFAULT 0.7,
    "backgroundColor" TEXT NOT NULL DEFAULT '#363446',
    "cellHeight" REAL NOT NULL DEFAULT 25,
    "cellWidth" REAL NOT NULL DEFAULT 25,
    "backgroundImage" TEXT,
    "showGrid" BOOLEAN NOT NULL DEFAULT false,
    "gridLineWidth" REAL NOT NULL DEFAULT 1,
    "gridLineColor" TEXT NOT NULL DEFAULT 'black',
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SlideExtra_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SlideExtra" ("backgroundColor", "backgroundImage", "cellHeight", "cellWidth", "color", "createdAt", "gridLineColor", "gridLineWidth", "id", "opacity", "showGrid", "slideId", "updatedAt") SELECT "backgroundColor", "backgroundImage", "cellHeight", "cellWidth", "color", "createdAt", "gridLineColor", "gridLineWidth", "id", "opacity", "showGrid", "slideId", "updatedAt" FROM "SlideExtra";
DROP TABLE "SlideExtra";
ALTER TABLE "new_SlideExtra" RENAME TO "SlideExtra";
CREATE UNIQUE INDEX "SlideExtra_slideId_key" ON "SlideExtra"("slideId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
