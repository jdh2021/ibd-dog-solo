
// stores array of symptom record objects for one dog
const recordReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECORD':
      return action.payload;
    case 'UNSET_USER':
      return [];
    default:
      return state;
  }
};

export default recordReducer;