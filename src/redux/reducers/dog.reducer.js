
// stores dog for one user
const dogReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DOG':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default dogReducer;
