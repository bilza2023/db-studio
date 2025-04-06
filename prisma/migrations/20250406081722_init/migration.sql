-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CanvasSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'canvas',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "startTime" INTEGER NOT NULL DEFAULT 0,
    "endTime" INTEGER NOT NULL DEFAULT 10,
    "template" TEXT,
    "presentationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CanvasSlide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CanvasSlide" ("createdAt", "id", "presentationId", "sortOrder", "type", "updatedAt", "uuid") SELECT "createdAt", "id", "presentationId", "sortOrder", "type", "updatedAt", "uuid" FROM "CanvasSlide";
DROP TABLE "CanvasSlide";
ALTER TABLE "new_CanvasSlide" RENAME TO "CanvasSlide";
CREATE UNIQUE INDEX "CanvasSlide_uuid_key" ON "CanvasSlide"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
