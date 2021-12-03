const initState = {
  auth: null,
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        auth: action.auth,
      };

    case "LOGOUT":
      return {
        auth: null,
      };

    default:
      return state;
  }
};

export default Reducer;
