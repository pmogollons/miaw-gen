/**
 * COLLECTION_NAME methods
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import { z } from "zod";
import { Meteor } from "meteor/meteor";
import { createMethod } from "meteor/zodern:relay";

import Security from "/imports/modules/security";

import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";
import { SCHEMA_NAME } from "/imports/api/COLLECTION_NAME_LC/schema";


export const createCOLLECTION_NAME = createMethod({
  name: "COLLECTION_NAME_LC.create",
  schema: SCHEMA_NAME,
  rateLimit: { interval: 5000, limit: 3 },
}).pipeline(
  Security.checkIsLoggedInMixin,
  async ({ params }) => {
    return await COLLECTION_NAME.insertAsync(params);
  },
);

export const updateCOLLECTION_NAME = createMethod({
  name: "COLLECTION_NAME_LC.update",
  schema: z.object({
    objectId: z.string().length(17),
    object: SCHEMA_NAME,
  }),
  rateLimit: { interval: 5000, limit: 3 },
}).pipeline(
  Security.checkIsLoggedInMixin,
  checkIsDocumentOwner,
  async ({ params }) => {
    return await COLLECTION_NAME.updateAsync({ _id: params.objectId }, { $set: params.object });
  },
);

export const removeCOLLECTION_NAME = createMethod({
  name: "COLLECTION_NAME_LC.remove",
  schema: z.object({
    objectId: z.string().length(17),
  }),
  rateLimit: { interval: 5000, limit: 3 },
}).pipeline(
  Security.checkIsLoggedInMixin,
  checkIsDocumentOwner,
  async ({ params }) => {
    return await COLLECTION_NAME.removeAsync({ _id: params.objectId });
  },
);

async function checkIsDocumentOwner(props) {
  const { params, userId } = props;
  const VAR_NAME = await COLLECTION_NAME.findOneAsync(
    { _id: params.objectId },
    { fields: { userId: 1 } },
  );

  if (!VAR_NAME) {
    throw new Meteor.Error("NOT_FOUND", "Document not found");
  }

  if (VAR_NAME.userId !== userId) {
    await Security.checkIsAdmin(userId);
  }

  return props;
}
