// userReducer.js
const initialState = {
  isLoggedIn: false,
  userDetails: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userDetails: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userDetails: null,
      };
    default:
      return state;
  }
};

export default userReducer;
