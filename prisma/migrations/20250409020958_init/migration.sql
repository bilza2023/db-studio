/*
  Warnings:

  - You are about to drop the column `version` on the `EqSlide` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EqSlide" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "period" INTEGER DEFAULT 10,
    "type" TEXT NOT NULL,
    "template" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "presentationId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EqSlide_presentationId_fkey" FOREIGN KEY ("presentationId") REFERENCES "Presentation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EqSlide" ("createdAt", "id", "period", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid") SELECT "createdAt", "id", "period", "presentationId", "sortOrder", "template", "type", "updatedAt", "uuid" FROM "EqSlide";
DROP TABLE "EqSlide";
ALTER TABLE "new_EqSlide" RENAME TO "EqSlide";
CREATE UNIQUE INDEX "EqSlide_uuid_key" ON "EqSlide"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
