/**
 * COLLECTION_NAME schema, helpers & definitions
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import { z } from "zod";
import { Meteor } from "meteor/meteor";

import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


const schemaObject = {
  name: z.string(),
};

export const SCHEMA_NAME = z.object(schemaObject);

if (Meteor.isServer) {
  COLLECTION_NAME
    .withSchema(SCHEMA_NAME)
    .withDates()
    .withUser()
    .withSoftDelete();
}
