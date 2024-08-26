/**
 * COLLECTION_NAME collection hooks
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


COLLECTION_NAME.onInsert(async ({ doc }) => {
  // TODO: Do something here after insert
}, {
  docFields: {
    name: true,
  },
});