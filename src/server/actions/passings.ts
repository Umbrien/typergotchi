import HttpError from '@wasp/core/HttpError.js';
import { User, Prisma } from '@prisma/client';

type soloPassingContext = {
  user: User;
  entities: {
    SoloPassing: Prisma.SoloPassingDelegate<{}>;
    User:        Prisma.UserDelegate<{}>;
  };
};

export async function addSoloPassing(args: {cpm: number}, context: soloPassingContext){
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.SoloPassing.create({
    data: {
      cpm: args.cpm,
      user: { connect: { id: context.user.id } },
    }
  })
}