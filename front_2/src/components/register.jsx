import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "axios";

const MainPage = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  width: 296px;
  height: 407px;
`;

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const registerRequest = async (email, password, name) => {
    await axios.post(`http://127.0.0.1:5000/register`, {
      email,
      password,
      name,
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        await registerRequest(email, password, name);
        alert("회원가입되었습니다. 로그인 화면으로 이동합니다.");
        history.push("/");
      } catch (e) {
        alert("다시 시도해주세요");
        history.push("/register");
      }
    })();
  };

  return (
    <MainPage>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <h2>Register Page</h2>

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
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">회원가입</button>

        <button type="button" onClick={() => history.push("/")}>
          로그인 페이지
        </button>
      </form>
    </MainPage>
  );
};

export default RegisterForm;
