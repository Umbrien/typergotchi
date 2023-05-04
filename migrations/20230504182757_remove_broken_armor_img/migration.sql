/*
  Warnings:

  - You are about to drop the column `imgBroken1` on the `DaBoiArmor` table. All the data in the column will be lost.
  - You are about to drop the column `imgBroken2` on the `DaBoiArmor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DaBoiArmor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL
);
INSERT INTO "new_DaBoiArmor" ("id", "img", "name", "price") SELECT "id", "img", "name", "price" FROM "DaBoiArmor";
DROP TABLE "DaBoiArmor";
ALTER TABLE "new_DaBoiArmor" RENAME TO "DaBoiArmor";
CREATE UNIQUE INDEX "DaBoiArmor_name_key" ON "DaBoiArmor"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
