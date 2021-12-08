import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/action";
import { BACKEND_URL } from "../../utils/env";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async () => {
    try {
      const response = await axios.post(BACKEND_URL + "/login", {
        email: email,
        password: password,
        type: 1,
      });

      dispatch(login(response.data.access_token));
      history.push("/");
    } catch (error) {
      alert(error.response);
    }
  };

  return (
    <>
      <form>
        <p>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button type="submit" onClick={loginHandler}>
        Login
      </button>
    </>
  );
};

export default LoginForm;
