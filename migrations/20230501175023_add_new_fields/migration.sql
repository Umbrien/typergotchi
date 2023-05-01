-- CreateTable
CREATE TABLE "SoloPassing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpm" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "SoloPassing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DaBoiSkin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "imgEmotionHappy" TEXT NOT NULL,
    "imgEmotionSad" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DaBoiArmor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "imgBroken1" TEXT NOT NULL,
    "imgBroken2" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DaBoiArmorToInventory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_DaBoiArmorToInventory_A_fkey" FOREIGN KEY ("A") REFERENCES "DaBoiArmor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DaBoiArmorToInventory_B_fkey" FOREIGN KEY ("B") REFERENCES "Inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "password" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationSentAt" DATETIME,
    "passwordResetSentAt" DATETIME,
    "username" TEXT,
    "description" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "daBoiSelectedSkinId" INTEGER,
    "daBoiSelectedArmorId" INTEGER,
    CONSTRAINT "User_daBoiSelectedSkinId_fkey" FOREIGN KEY ("daBoiSelectedSkinId") REFERENCES "DaBoiSkin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_daBoiSelectedArmorId_fkey" FOREIGN KEY ("daBoiSelectedArmorId") REFERENCES "DaBoiArmor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "emailVerificationSentAt", "id", "isEmailVerified", "password", "passwordResetSentAt") SELECT "email", "emailVerificationSentAt", "id", "isEmailVerified", "password", "passwordResetSentAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "DaBoiArmor_name_key" ON "DaBoiArmor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_DaBoiArmorToInventory_AB_unique" ON "_DaBoiArmorToInventory"("A", "B");

-- CreateIndex
CREATE INDEX "_DaBoiArmorToInventory_B_index" ON "_DaBoiArmorToInventory"("B");
