/*
  Warnings:

  - You are about to drop the column `img` on the `DaBoiSkin` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DaBoiSkin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imgEmotionHappy" TEXT NOT NULL,
    "imgEmotionSad" TEXT NOT NULL
);
INSERT INTO "new_DaBoiSkin" ("id", "imgEmotionHappy", "imgEmotionSad", "name") SELECT "id", "imgEmotionHappy", "imgEmotionSad", "name" FROM "DaBoiSkin";
DROP TABLE "DaBoiSkin";
ALTER TABLE "new_DaBoiSkin" RENAME TO "DaBoiSkin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
