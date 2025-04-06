/*
  Warnings:

  - You are about to alter the column `listArray` on the `CanvasList` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

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
    "listArray" JSONB NOT NULL,
    "fontSize" REAL NOT NULL,
    "fontFamily" TEXT NOT NULL,
    "lineGap" REAL NOT NULL,
    "indentation" REAL NOT NULL,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasList_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "CanvasSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasList" ("color", "createdAt", "fontFamily", "fontSize", "id", "indentation", "lineGap", "listArray", "name", "opacity", "slideId", "type", "updatedAt", "uuid", "x", "y") SELECT "color", "createdAt", "fontFamily", "fontSize", "id", "indentation", "lineGap", "listArray", "name", "opacity", "slideId", "type", "updatedAt", "uuid", "x", "y" FROM "CanvasList";
DROP TABLE "CanvasList";
ALTER TABLE "new_CanvasList" RENAME TO "CanvasList";
CREATE UNIQUE INDEX "CanvasList_uuid_key" ON "CanvasList"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
