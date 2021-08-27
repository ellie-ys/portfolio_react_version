import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MainPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  width: 296px;
  height: 407px;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  async function loginRequest(e) {
    e.preventDefault();
    const response = await axios.post(`http://127.0.0.1:5000/login`, {
      email,
      password,
    });
    if (response.data.result === "success")
      history.push(`/elicer/${response.data.data.user.id}`);
    alert(`${response.data.data.user.name}님 환영합니다`);
  }

  return (
    <>
      <div>
        <MainPage>
          <h2>Login Page</h2>
          <br />
          <form onSubmit={(e) => loginRequest(e)}>
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
            <div>
              <button type="submit">로그인</button>
              <button type="button" onClick={() => history.push("/register")}>
                회원가입
              </button>
            </div>
            <button type="button" disabled={false}>
              구글계정으로 로그인
            </button>
          </form>
        </MainPage>
      </div>
    </>
  );
};

export default LoginForm;
