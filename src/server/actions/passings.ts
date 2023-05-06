import HttpError from "@wasp/core/HttpError.js";
import { AddSoloPassing } from "@wasp/actions/types";
import { SoloPassing } from "@wasp/entities";

export const addSoloPassing: AddSoloPassing<
  Pick<SoloPassing, "cpm">,
  SoloPassing
> = async ({ cpm }, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.SoloPassing.create({
    data: {
      cpm,
      user: { connect: { id: context.user.id } },
    },
  });
};
