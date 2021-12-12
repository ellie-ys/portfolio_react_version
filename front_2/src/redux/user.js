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
        user_id: action.user_id,
        isLogined: action.isLogined,
      };

    case "LOGOUT":
      return {
        ...state,
        access_token: action.access_token,
        user_id: action.user_id,
        isLogined: action.isLogined,
      };

    case "REFRESH":
      return {
        ...state,
        access_token: action.access_token,
      };

    default:
      return state;
  }
};

export default user;
