import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../env";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPw, setVerifyPw] = useState("");
  const [userName, setUserName] = useState("");

  const history = useHistory();

  const registerRequest = async () => {
    const response = await axios.post(BACKEND_URL + "/register", {
      email: email,
      password: verifyPw,
      name: userName,
      type: 1,
    });

    console.count(response);
  };

  const registerHandler = () => {
    registerRequest();
    history.push("/login");
  };
  return (
    <>
      <form>
        <p>이메일</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>비밀번호</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>비밀번호 확인</p>
        <input
          type="password"
          value={verifyPw}
          onChange={(e) => setVerifyPw(e.target.value)}
        />
        <p>이름</p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      <button type="submit" onClick={registerHandler}>
        회원가입
      </button>
    </>
  );
};

export default RegisterForm;
