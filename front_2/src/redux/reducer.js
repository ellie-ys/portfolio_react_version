const initState = {
  auth: null,
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        auth: "Login 성공!",
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
