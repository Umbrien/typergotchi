import { User, Prisma } from "@prisma/client";

type getDaBoiSkinsProps = {};

type getDaBoiSkinsContext = {
  user: User;
  entities: {
    DaBoiSkin: Prisma.DaBoiSkinDelegate<{}>;
    User: Prisma.UserDelegate<{}>;
  };
};

export const getDaBoiSkins = async (
  args: getDaBoiSkinsProps,
  context: getDaBoiSkinsContext
) => {
  return context.entities.DaBoiSkin.findMany({});
};
