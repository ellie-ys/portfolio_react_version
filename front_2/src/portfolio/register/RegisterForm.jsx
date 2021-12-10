import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "utils/env";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPw, setVerifyPw] = useState("");
  const [userName, setUserName] = useState("");

  const [wrongPw, setWrongPw] = useState(true);
  const [isBlank, setIsBlank] = useState(true);
  const [allOk, setAllOk] = useState(false);

  const history = useHistory();

  const registerHandler = async () => {
    if (allOk) {
      try {
        const response = await axios.post(BACKEND_URL + "/register", {
          email: email,
          password: pw,
          password_check: pwCheck,
          name: userName,
          user_type: 1,
        });
        history.push("/login");
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    if (pw !== pwCheck) setWrongPw(true);
    else setWrongPw(false);
  }, [pw, pwCheck]);

  useEffect(() => {
    if (email === "" || pw === "" || pwCheck === "" || userName === "")
      setIsBlank(true);
    else setIsBlank(false);
  }, [email, pw, pwCheck, userName]);

  useEffect(() => {
    if (!wrongPw && !isBlank) setAllOk(true);
    else setAllOk(false);
  }, [wrongPw, isBlank]);

  return (
    <>
      <form>
        <p>E-mail</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>Password Confirm</p>
        <input
          type="password"
          value={verifyPw}
          onChange={(e) => setVerifyPw(e.target.value)}
        />
        {pwCheck !== "" && wrongPw && (
          <p style={{ color: "red" }}> 비밀번호가 일치하지 않습니다. </p>
        )}
        <p>Name</p>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        {isBlank && <p style={{ color: "red" }}> 모든 항목을 채워주세요. </p>}
      </form>
      <button type="submit" onClick={registerHandler}>
        Register
      </button>
    </>
  );
};

export default RegisterForm;
