import { FetchDaBoiSkins, FetchDaBoiArmor } from "@wasp/queries/types";
import { DaBoiSkin, DaBoiArmor } from "@wasp/entities";
import { generateImageJob } from "@wasp/jobs/generateImageJob.js";
import { bucketUrl } from "@wasp/shared/constants.js";

export const getDaBoiSkins: FetchDaBoiSkins<Object, DaBoiSkin[]> = (
  _args,
  context
) => {
  return context.entities.DaBoiSkin.findMany({});
};

export const getDaBoiArmor: FetchDaBoiArmor<
  { maxPrice: number },
  DaBoiArmor[]
> = ({ maxPrice }, context) => {
  return context.entities.DaBoiArmor.findMany({
    where: { price: { lte: maxPrice } },
  });
};
