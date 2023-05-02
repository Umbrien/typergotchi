import HttpError from "@wasp/core/HttpError.js";
import { addSoloPassingContext } from "../_types";

export async function addSoloPassing(
  args: { cpm: number },
  context: addSoloPassingContext
) {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.SoloPassing.create({
    data: {
      cpm: args.cpm,
      user: { connect: { id: context.user.id } },
    },
  });
}
