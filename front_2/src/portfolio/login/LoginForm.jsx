import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "redux/action";
import { BACKEND_URL } from "utils/env";
import { passwordRegex, emailRegex } from "utils/validation";
import {
  LoginFormStyle,
  LoginTitle,
  LoginButtonStyle,
  InputStyle,
  FlashMessage,
} from "portfolio/login/LoginStyle";

import axios from "axios";
import styled from "styled-components";

const LoginFormStyle = styled.div`
  width: 80%;
  margin: 0 auto;
  border: solid 2px blue;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(false);
  const [isBlank, setIsBlank] = useState(true);
  const [allOk, setAllOk] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandler = async () => {
    setEmail("");
    setPw("");
    if (allOk) {
      try {
        const response = await axios.post(BACKEND_URL + "/login", {
          email: email,
          password: pw,
          user_type: 1,
        });

        dispatch(login(response.data.access_token, response.data.user_id));
        setMessage("");
        history.push(`/main`);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      setMessage("이메일과 비밀번호를 다시 확인해주세요");
    }
  };
  useEffect(() => {
    if (email === "" || pw === "") setIsBlank(true);
    else setIsBlank(false);

    if (emailRegex(email) && passwordRegex(pw)) setValidation(true);
    else setValidation(false);
  }, [email, pw]);

  useEffect(() => {
    if (!isBlank && validation) setAllOk(true);
    else setAllOk(false);
  }, [isBlank, validation]);

  return (
    <LoginFormStyle>
      <LoginTitle> RACERIN LOGIN </LoginTitle>
      <FlashMessage>{message}</FlashMessage>

      <InputStyle>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
        </div>
        <div>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
      </InputStyle>
      <LoginButtonStyle>
        <button type="submit" onClick={loginHandler}>
          {" "}
          로그인{" "}
        </button>
        <button onClick={googleLoginHandler}> 구글계정으로 로그인</button>
      </LoginButtonStyle>
    </LoginFormStyle>
  );
};

export default LoginForm;
