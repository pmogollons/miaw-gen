/**
 * COLLECTION_NAME grapher reducers
 *
 * https://www.indesigncolombia.com
 * https://www.meteor.com.co
 * @paulo.mogollon
 */

import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


COLLECTION_NAME.addReducers({
  namex2: {
    dependency: {
      name: true,
    },
    async reduce({ name }) {
      return `${name} ${name}`;
    },
  },
});
