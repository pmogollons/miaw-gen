import COLLECTION_NAME from "/imports/api/COLLECTION_NAME_LC";


export const LIST_QUERY_NAME = COLLECTION_NAME.createQuery("LIST_QUERY_NAME", {
  $search: true,
  $paginate: true,
  $options: {
    sort: {
      createdAt: -1,
    },
  },

  _id: true,
  name: true,
  createdAt: true,
  updatedAt: true,

  user: {
    _id: true,
    fullName: true,
    avatarURL: true,
  },
});
