/*
  Warnings:

  - Added the required column `labelX` to the `CanvasDot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labelY` to the `CanvasDot` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanvasDot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'dot',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "labelX" INTEGER NOT NULL,
    "labelY" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "radius" REAL NOT NULL,
    "textColor" TEXT NOT NULL,
    "textSize" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasDot_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasDot" ("color", "createdAt", "id", "label", "name", "opacity", "radius", "slideId", "textColor", "textSize", "type", "updatedAt", "uuid", "x", "y") SELECT "color", "createdAt", "id", "label", "name", "opacity", "radius", "slideId", "textColor", "textSize", "type", "updatedAt", "uuid", "x", "y" FROM "CanvasDot";
DROP TABLE "CanvasDot";
ALTER TABLE "new_CanvasDot" RENAME TO "CanvasDot";
CREATE UNIQUE INDEX "CanvasDot_uuid_key" ON "CanvasDot"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
