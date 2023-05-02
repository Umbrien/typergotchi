import { getDaBoiSkinsContext } from "./_types";

export const getDaBoiSkins = async ({}: {}, context: getDaBoiSkinsContext) => {
  return context.entities.DaBoiSkin.findMany({});
};
