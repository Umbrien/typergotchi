import { PrismaClient } from "@prisma/client";

export async function seedDaBoiSkins(prismaClient: PrismaClient) {
  const daBoiFolder = "preboiz/";
  await prismaClient.daBoiSkin.createMany({
    data: [
      {
        name: "Boi",
        imgHappy: daBoiFolder + "default_happ.png",
        imgSad: daBoiFolder + "default_sad.png",
      },
      {
        name: "SpaceBoi",
        imgHappy: daBoiFolder + "space_happ.png",
        imgSad: daBoiFolder + "space_sad.png",
      },
      {
        name: "SpiceyBoi",
        imgHappy: daBoiFolder + "green_happ.png",
        imgSad: daBoiFolder + "green_sad.png",
      },
    ],
  });
}

export async function seedDaBoiArmors(prismaClient: PrismaClient) {
  const armorFolder = "armor/";
  await prismaClient.daBoiArmor.createMany({
    data: [
      {
        name: "wasp",
        price: 100,
        img: armorFolder + "logo.png",
      },
      {
        name: "Christmas",
        price: 10,
        img: armorFolder + "MC.png",
      },
      {
        name: "Top hat",
        price: 8,
        img: armorFolder + "gentleboi.png",
      },
      {
        name: "Wmelon",
        price: 50,
        img: armorFolder + "wmelon.png",
      },
      {
        name: "Paper",
        price: 20,
        img: armorFolder + "paper.png",
      },
      {
        name: "Jester",
        price: 25,
        img: armorFolder + "jester.png",
      },
      {
        name: "Kid hat",
        price: 18,
        img: armorFolder + "kid.png",
      },
      {
        name: "Wcrop",
        price: 35,
        img: armorFolder + "wcorp.png",
      },
    ],
  });
}
