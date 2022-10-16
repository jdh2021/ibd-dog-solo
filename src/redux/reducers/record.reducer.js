
// stores array of symptom record objects
const recordReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECORD':
      return action.payload;
    default:
      return state;
  }
};

export default recordReducer;