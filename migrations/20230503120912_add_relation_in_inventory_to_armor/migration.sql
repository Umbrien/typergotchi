/*
  Warnings:

  - You are about to drop the `_DaBoiArmorToInventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `armorId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_DaBoiArmorToInventory_B_index";

-- DropIndex
DROP INDEX "_DaBoiArmorToInventory_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_DaBoiArmorToInventory";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "armorId" INTEGER NOT NULL,
    CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inventory_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "DaBoiArmor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("id", "userId") SELECT "id", "userId" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");
CREATE UNIQUE INDEX "Inventory_armorId_key" ON "Inventory"("armorId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
