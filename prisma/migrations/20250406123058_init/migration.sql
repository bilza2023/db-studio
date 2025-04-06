/*
  Warnings:

  - You are about to drop the column `listItems` on the `CanvasList` table. All the data in the column will be lost.
  - Added the required column `listArray` to the `CanvasList` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanvasList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'list',
    "name" TEXT NOT NULL DEFAULT '',
    "opacity" REAL NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL,
    "x" REAL NOT NULL,
    "y" REAL NOT NULL,
    "listArray" TEXT NOT NULL,
    "fontSize" REAL NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "lineGap" REAL NOT NULL,
    "indentation" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasList_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasList" ("color", "createdAt", "fontFamily", "fontSize", "id", "indentation", "lineGap", "name", "opacity", "slideId", "type", "updatedAt", "uuid", "x", "y") SELECT "color", "createdAt", "fontFamily", "fontSize", "id", "indentation", "lineGap", "name", "opacity", "slideId", "type", "updatedAt", "uuid", "x", "y" FROM "CanvasList";
DROP TABLE "CanvasList";
ALTER TABLE "new_CanvasList" RENAME TO "CanvasList";
CREATE UNIQUE INDEX "CanvasList_uuid_key" ON "CanvasList"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
