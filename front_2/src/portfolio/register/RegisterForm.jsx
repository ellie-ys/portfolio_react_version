import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { pwRegex, emailRegex, nameRegex } from "utils/validation";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPw, setVerifyPw] = useState("");
  const [userName, setUserName] = useState("");

  const [wrongPw, setWrongPw] = useState(true);
  const [isBlank, setIsBlank] = useState(true);
  const [allOk, setAllOk] = useState(false);
  const [validation, setValidation] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validPw, setValidPw] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

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

    if (nameRegex(userName) && emailRegex(email) && pwRegex(pw))
      setValidation(true);
    else setValidation(false);

    if (nameRegex(userName)) setValidName(true);
    else setValidName(false);

    if (emailRegex(email)) setValidEmail(true);
    else setValidEmail(false);

    if (pwRegex(pw)) setValidPw(true);
    else setValidPw(false);
  }, [email, pw, pwCheck, userName]);

  useEffect(() => {
    if (!wrongPw && !isBlank && validation) setAllOk(true);
    else setAllOk(false);
  }, [wrongPw, isBlank, validation]);

  return (
    <>
      <form>
        <p>E-mail</p>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email !== "" && !validEmail && (
          <p style={{ color: "red" }}>
            {" "}
            이메일 형식이 올바르지 않습니다. ex) abc@domain.com{" "}
          </p>
        )}
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {pw !== "" && !validPw && (
          <p style={{ color: "red" }}>
            {" "}
            다음 중 한가지를 만족해주세요. <br /> 8자 이상: 특수문자, 영어, 숫자
            포함 <br /> 10자 이상: 특수문자, 영어, 숫자중 2종류 포함{" "}
          </p>
        )}
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
        {userName !== "" && !validName && (
          <p style={{ color: "red" }}>
            {" "}
            이름에는 숫자 또는 특수문자가 포함될 수 없습니다. (20자 이내)
          </p>
        )}
        {isBlank && <p style={{ color: "red" }}> 모든 항목을 채워주세요. </p>}
      </form>
      <button type="submit" onClick={registerHandler} disabled={!allOk}>
        Register
      </button>
    </>
  );
};

export default RegisterForm;
