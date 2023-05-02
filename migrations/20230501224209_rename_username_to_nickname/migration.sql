/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "password" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationSentAt" DATETIME,
    "passwordResetSentAt" DATETIME,
    "nickname" TEXT,
    "description" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "daBoiSelectedSkinId" INTEGER,
    "daBoiSelectedArmorId" INTEGER,
    CONSTRAINT "User_daBoiSelectedSkinId_fkey" FOREIGN KEY ("daBoiSelectedSkinId") REFERENCES "DaBoiSkin" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_daBoiSelectedArmorId_fkey" FOREIGN KEY ("daBoiSelectedArmorId") REFERENCES "DaBoiArmor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("balance", "daBoiSelectedArmorId", "daBoiSelectedSkinId", "description", "email", "emailVerificationSentAt", "id", "isEmailVerified", "password", "passwordResetSentAt") SELECT "balance", "daBoiSelectedArmorId", "daBoiSelectedSkinId", "description", "email", "emailVerificationSentAt", "id", "isEmailVerified", "password", "passwordResetSentAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
