const initState = {
  auth: {},
  isLoggedIn: false,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: action.auth,
        isLoggedIn: action.isLoggedIn,
      };

    case "LOGOUT":
      return {
        ...state,
        auth: action.auth,
        isLoggedIn: action.isLoggedIn,
      };

    default:
      return state;
  }
};

export default user;
