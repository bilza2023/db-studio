/*
  Warnings:

  - You are about to drop the column `endTime` on the `EqItem` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `EqItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EqItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "uuid" TEXT NOT NULL,
    "name" TEXT DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "showAt" INTEGER NOT NULL,
    "period" INTEGER NOT NULL DEFAULT 10,
    "code" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "sortOrder" INTEGER DEFAULT 0,
    "slideId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EqItem_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "EqSlide" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EqItem" ("code", "content", "createdAt", "id", "name", "showAt", "slideId", "sortOrder", "type", "updatedAt", "uuid") SELECT "code", "content", "createdAt", "id", "name", "showAt", "slideId", "sortOrder", "type", "updatedAt", "uuid" FROM "EqItem";
DROP TABLE "EqItem";
ALTER TABLE "new_EqItem" RENAME TO "EqItem";
CREATE UNIQUE INDEX "EqItem_uuid_key" ON "EqItem"("uuid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
