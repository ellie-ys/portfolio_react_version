import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
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
  padding: 40px 40px 200px 60px;
  background-color: #f7f9ff;
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
const InputForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const RegisterPost = async () => {
    try {
      const response = await axios.post(
        `http://http://127.0.0.1:5000/register`,
        {
          email,
          password,
          name,
        }
      );
      history.push("/login");
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    RegisterPost();
  };

  return (
    <>
      <DivForm>
        <SeconForm>
          <Hh2>
            <Title>Sign up</Title>
            <br />
            <form onSubmit={handleRegisterSubmit}>
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
                  <label htmlFor="password2">비밀번호 확인</label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    placeholder="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </InputForm>
              </div>
              <div>
                <InputForm>
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputForm>
              </div>
              <div>
                <InputForm>
                  <button type="submit">회원가입</button>
                </InputForm>
                <InputForm>
                  <button type="button" onClick={() => history.push("/")}>
                    로그인 페이지
                  </button>
                </InputForm>
              </div>
            </form>
          </Hh2>
        </SeconForm>
      </DivForm>
    </>
  );
};

export default RegisterForm;
