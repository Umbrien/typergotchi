import HttpError from "@wasp/core/HttpError.js";
import { BuyDaBoiArmor } from "@wasp/actions/types";
import { User, Inventory, DaBoiArmor } from "@wasp/entities";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const buyDaBoiArmor: BuyDaBoiArmor<
  Pick<DaBoiArmor, "id">,
  [Inventory, User]
> = async ({ id: daBoiArmorId }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  const userMoney = await context.entities.User.findUniqueOrThrow({
    where: { id: context.user.id },
    select: { balance: true },
  });
  const armorPrice = await context.entities.DaBoiArmor.findUniqueOrThrow({
    where: { id: daBoiArmorId },
    select: { price: true },
  });
  if (armorPrice.price > userMoney.balance) {
    throw new HttpError(401);
  }

  return prisma.$transaction([
    prisma.inventory.create({
      data: {
        userId: context.user.id,
        armorId: daBoiArmorId,
      },
    }),
    prisma.user.update({
      where: { id: context.user.id },
      data: { balance: { decrement: armorPrice.price } },
    }),
  ]);
};
