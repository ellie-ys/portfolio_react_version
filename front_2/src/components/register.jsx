import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import { registerRequest } from "../apis/auth";
import * as AuthForm from "./forms/AuthForm";
import * as validation from "../utils/validation";

const RegisterInputField = styled(AuthForm.InputField)`
  input {
    background-color: #f7f6f2;
    border: 2px solid ${(props) => (props.valid ? "green" : "red")};
    ${(props) =>
      props.value &&
      css`
        border: 0.5px solid #ebb6f8;
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
const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPassword2Valid, setIsPassword2Valid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const history = useHistory();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        await registerRequest(email, password, name);
        alert("회원가입에 성공하였습니다. 로그인 페이지로 이동합니다.");
        history.push("/auth/login");
      } catch (e) {
        alert(e.response.data.message);
      }
    })();
  };
  useEffect(() => {
    setIsEmailValid(validation.emailValidation(email));
  }, [email]);

  useEffect(() => {
    setIsPasswordValid(validation.passwordValidation(password));
    setIsPassword2Valid(validation.password2Validation(password, password2));
  }, [password, password2]);

  useEffect(() => {
    setIsNameValid(validation.nameValidation(name));
  }, [name]);

  return (
    <AuthForm.FormWrapper>
      <Title>Sign up</Title>
      <AuthForm.Form onSubmit={handleRegisterSubmit}>
        <RegisterInputField valid={isEmailValid} value={email === ""}>
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </RegisterInputField>
        {email !== "" && !isEmailValid && (
          <AuthForm.WarningMessage>
            올바른 이메일 형식이 아닙니다.
          </AuthForm.WarningMessage>
        )}
        <RegisterInputField valid={isPasswordValid} value={password === ""}>
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
        </RegisterInputField>
        {password !== "" && !isPasswordValid && (
          <AuthForm.WarningMessage>
            비밀번호는 8자리 이상의 영문+숫자+특수문자 혹은,
            <br />
            10자리 이상의 영문+숫자의 조합이어야합니다.
          </AuthForm.WarningMessage>
        )}
        <RegisterInputField valid={isPassword2Valid} value={password2 === ""}>
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            autoComplete="off"
            id="password2"
            name="password2"
            placeholder="password check"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </RegisterInputField>
        {password2 !== "" && !isPassword2Valid && (
          <AuthForm.WarningMessage>
            비밀번호 확인이 일치하지 않습니다.
          </AuthForm.WarningMessage>
        )}
        <RegisterInputField valid={isNameValid} value={name === ""}>
          <label htmlFor="email">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </RegisterInputField>
        {name !== "" && !isNameValid && (
          <AuthForm.WarningMessage>
            이름은 영문이나 한글로 입력해주세요.
          </AuthForm.WarningMessage>
        )}
        <button
          type="submit"
          disabled={
            !isEmailValid ||
            !isPasswordValid ||
            !isPassword2Valid ||
            !isNameValid
          }
        >
          가입하기
        </button>
        <button type="button" onClick={() => history.push("/login")}>
          로그인 페이지로
        </button>
      </AuthForm.Form>
    </AuthForm.FormWrapper>
  );
};

export default RegisterForm;
