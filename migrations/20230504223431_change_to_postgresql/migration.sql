-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationSentAt" TIMESTAMP(3),
    "passwordResetSentAt" TIMESTAMP(3),
    "nickname" TEXT,
    "description" TEXT,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "daBoiHappyImg" TEXT,
    "daBoiSadImg" TEXT,
    "daBoiSelectedSkinId" INTEGER,
    "daBoiSelectedArmorId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoloPassing" (
    "id" SERIAL NOT NULL,
    "cpm" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SoloPassing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaBoiSkin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgHappy" TEXT NOT NULL,
    "imgSad" TEXT NOT NULL,

    CONSTRAINT "DaBoiSkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DaBoiArmor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "DaBoiArmor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "armorId" INTEGER NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "DaBoiArmor_name_key" ON "DaBoiArmor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_key" ON "Inventory"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_armorId_key" ON "Inventory"("armorId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_daBoiSelectedSkinId_fkey" FOREIGN KEY ("daBoiSelectedSkinId") REFERENCES "DaBoiSkin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_daBoiSelectedArmorId_fkey" FOREIGN KEY ("daBoiSelectedArmorId") REFERENCES "DaBoiArmor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoloPassing" ADD CONSTRAINT "SoloPassing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_armorId_fkey" FOREIGN KEY ("armorId") REFERENCES "DaBoiArmor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
