import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [userName, setUserName] = useState("");

  const history = useHistory();
  const registerHandler = () => {
    history.push("/login");
  };
  return (
    <>
      <form>
        <p>아이디</p>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <p>비밀번호</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <p>비밀번호 확인</p>
        <input
          type="password"
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
        />
        <p>이름</p>
        <input
          type="password"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </form>
      <button type="submit" onClick={registerHandler}>
        {" "}
        회원가입{" "}
      </button>
    </>
  );
};

export default RegisterForm;
