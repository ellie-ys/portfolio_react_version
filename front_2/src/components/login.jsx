import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { loginRequest } from "../apis/auth";
import * as validation from "../utils/validation";

import * as AuthForm from "./forms/AuthForm";

const LoginInputField = styled(AuthForm.InputField)`
  input {
    background-color: #f7f6f2;
    border: 1px solid #4b6587;
    ${(props) =>
      !props.isValid &&
      css`
        border: 2px solid tomato;
      `}
  }
  input:focus {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginForm = ({ setLoginId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const history = useHistory();

  const handleLoginButton = (e) => {
    e.preventDefault();
    if (!validation.emailValidation(email) || password.length < 8) {
      setIsEmailValid(validation.emailValidation(email));
      setIsPasswordValid(password.length >= 8);
      return;
    }

    (async () => {
      try {
        const loginUserId = await loginRequest(email, password);
        setLoginId(loginUserId);
        history.push("/elicer");
      } catch (e) {
        if (e.response === 401) {
          alert(e.response.data.message);
          setIsEmailValid(true);
          setIsPasswordValid(true);
        }
      }
    })();
  };

  return (
    <AuthForm.FormWrapper>
      <Title>Login</Title>
      <AuthForm.Form onSubmit={handleLoginButton}>
        <LoginInputField isValid={isEmailValid}>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </LoginInputField>
        {!isEmailValid && (
          <AuthForm.WarningMessage>
            올바른 이메일 형식이 아닙니다.
          </AuthForm.WarningMessage>
        )}
        <LoginInputField isValid={isPasswordValid}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </LoginInputField>
        {!isPasswordValid && (
          <AuthForm.WarningMessage>
            8자리 이상의 비밀번호를 입력해주세요.
          </AuthForm.WarningMessage>
        )}
        <button type="submit">로그인</button>
        <button type="button" disabled={false}>
          구글계정으로 로그인
        </button>
        <button type="button" onClick={() => history.push("/register")}>
          회원가입
        </button>
      </AuthForm.Form>
    </AuthForm.FormWrapper>
  );
};
export default LoginForm;
