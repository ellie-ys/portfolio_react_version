const initState = {
    auth: "로그인 안함"
    }

    const Reducer = (state = initState, action) => {
    switch(action.type) {
        case "LOGIN":
        return {
            auth: "로그인 함"
        }

        case "LOGOUT":
        return {
            auth: "로그인 안함"
        }

        default:
        return state;
    }
    }

    export default Reducer;
