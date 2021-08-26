import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginRequest = async (email, password) => {
    try {
      const response = await axios.post(`http://127.0.0.1:5000/login`, {
        email,
        password,
      });
      history.push("/");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginRequest(email, password);
        }}
      >
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
        <button type="button" onClick={() => history.push("/register")}>
          회원가입하기
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
