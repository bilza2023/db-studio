/*
  Warnings:

  - You are about to drop the column `chartData` on the `CanvasPieChart` table. All the data in the column will be lost.
  - Added the required column `data` to the `CanvasPieChart` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanvasPieChart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'piechart',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "radius" REAL NOT NULL,
    "data" JSONB NOT NULL,
    "showLabels" BOOLEAN NOT NULL,
    "labelFontSize" REAL NOT NULL,
    "labelColor" TEXT NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasPieChart_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasPieChart" ("createdAt", "id", "labelColor", "labelFontSize", "name", "opacity", "radius", "showLabels", "slideId", "type", "updatedAt", "uuid", "x", "y") SELECT "createdAt", "id", "labelColor", "labelFontSize", "name", "opacity", "radius", "showLabels", "slideId", "type", "updatedAt", "uuid", "x", "y" FROM "CanvasPieChart";
DROP TABLE "CanvasPieChart";
ALTER TABLE "new_CanvasPieChart" RENAME TO "CanvasPieChart";
CREATE UNIQUE INDEX "CanvasPieChart_uuid_key" ON "CanvasPieChart"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
