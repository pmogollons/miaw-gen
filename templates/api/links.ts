/**
 * COLLECTION_NAME grapher links
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import Users from "/imports/api/users";
import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


COLLECTION_NAME.addLinks({
  user: {
    collection: Users,
    field: "userId",
  },
});
