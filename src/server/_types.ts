import { User, Prisma } from "@prisma/client";

export type Context = {
  user: User;
  entities: {
    User: Prisma.UserDelegate<{}>;
  };
};

export type getDaBoiSkinsContext = Context & {
  entities: {
    DaBoiSkin: Prisma.DaBoiSkinDelegate<{}>;
  };
};

export type addSoloPassingContext = Context & {
  entities: {
    SoloPassing: Prisma.SoloPassingDelegate<{}>;
  };
};
