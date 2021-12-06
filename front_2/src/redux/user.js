const initState = {
  access_token: {},
  isLoggedIn: false,
};

const user = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        access_token: action.access_token,
        isLoggedIn: action.isLoggedIn,
      };

    case "LOGOUT":
      return {
        ...state,
        access_token: action.access_token,
        isLoggedIn: action.isLoggedIn,
      };

    default:
      return state;
  }
};

export default user;
