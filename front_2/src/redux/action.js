export const login = (auth) => ({
    type: "LOGIN",
    auth: auth
})

export const logout = () => ({
    type: "LOGOUT",
})
