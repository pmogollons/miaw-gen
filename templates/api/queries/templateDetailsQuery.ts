import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


export const DETAILS_QUERY_NAME = COLLECTION_NAME.createQuery("DETAILS_QUERY_NAME", {
  $filter({ filters, params }) {
    filters._id = params._id;
  },

  _id: true,
  name: true,

  user: {
    _id: true,
    fullName: true,
    avatarURL: true,
  },
});
