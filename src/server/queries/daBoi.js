export const getDaBoiSkins = async (args, context) => {
  return context.entities.DaBoiSkin.findMany({});
};
