
// stores array of medication objects for one dog
const medicationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEDICATION':
      return action.payload;
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }
};

export default medicationReducer;
