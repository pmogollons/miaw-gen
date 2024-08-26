/**
 * COLLECTION_NAME grapher query exposers
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import { z } from "zod";

import Security from "/imports/modules/security";

import { LIST_QUERY_NAME } from "/imports/api/COLLECTION_NAME_LC/queries/LIST_QUERY_NAME";
import { DETAILS_QUERY_NAME } from "/imports/api/COLLECTION_NAME_LC/queries/DETAILS_QUERY_NAME";


LIST_QUERY_NAME.expose({
  async firewall(userId) {
    Security.checkIsLoggedIn(userId);
  },
  schema: z.object({
    searchText: z.string().optional(),
    skip: z.number().optional(),
    limit: z.number().optional(),
  }),
});

DETAILS_QUERY_NAME.expose({
  async firewall(userId) {
    Security.checkIsLoggedIn(userId);
  },
  schema: z.object({
    _id: z.string(),
  }),
});