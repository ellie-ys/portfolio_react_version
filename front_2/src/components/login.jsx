import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Title = styled.div`
  font-size: 300%;
`;
const DivForm = styled.div`
  width: 100%;
  height: 2000px;
  background-color: #f7f9ff;
  box-sizing: border-box;
  padding-top: 25vh;
  font-size: 189%;
`;
const Hh2 = styled.div`
  width: 500px;
  height: 800px;
`;
const SeconForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 10px 10px 10px;
  background-color: #f7f9ff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const InputForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  async function loginPost(e) {
    e.preventDefault();
    const response = await axios.post("http://127.0.0.1:5000/login", {
      email,
      password,
    });
    if (response.data.result === "success")
      history.push(`/elicer/${response.data.data.user.id}`);
    alert(`${response.data.data.user.name}님 환영합니다`);
  }

  // function loginPost = async (email, password) => {
  //   try {
  //     const response = await axios.post(`http://127.0.0.1:5000/login`, {
  //       email,
  //       password,
  //     });
  //     if (response.data.result === "success")
  //       history.push(`/elicer/${response.data.data.user.id}`);
  //   } catch (e) {
  //     alert(`${response.data.data.user.name}님 환영합니다`);
  //   }
  // };

  return (
    <>
      <DivForm>
        <SeconForm>
          <Hh2>
            <Title>Login</Title>
            <br />
            <form
              onSubmit={(e) => {
                loginPost(e);
              }}
            >
              <div>
                <InputForm>
                  <label htmlFor="email">이메일</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputForm>
              </div>

              <div>
                <InputForm>
                  <label htmlFor="password">비밀번호</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputForm>
              </div>
              <div>
                <InputForm>
                  <button type="submit">로그인</button>
                  <button
                    type="button"
                    onClick={() => history.push("/register")}
                  >
                    회원가입
                  </button>
                </InputForm>
              </div>
              <InputForm>
                <button type="button" disabled={false}>
                  구글계정으로 로그인
                </button>
              </InputForm>
            </form>
          </Hh2>
        </SeconForm>
      </DivForm>
    </>
  );
};

export default LoginForm;
