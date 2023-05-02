import { daBoiSkinsContext } from "../_types";

export const getDaBoiSkins = async ({}: {}, context: daBoiSkinsContext) => {
  return context.entities.DaBoiSkin.findMany({});
};
