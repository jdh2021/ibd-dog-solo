
// stores array of medication objects for one dog
const medicationReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MEDICATION':
      return action.payload;
    default:
      return state;
  }
};

export default medicationReducer;
