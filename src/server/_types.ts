import { User, Prisma } from "@prisma/client";

export type Context = {
  user: User;
  entities: {
    User: Prisma.UserDelegate<{}>;
  };
};

export type daBoiSkinsContext = Context & {
  entities: {
    DaBoiSkin: Prisma.DaBoiSkinDelegate<{}>;
  };
};

export type soloPassingContext = Context & {
  entities: {
    SoloPassing: Prisma.SoloPassingDelegate<{}>;
  };
};

