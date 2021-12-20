import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { passwordRegex, emailRegex, nameRegex } from "utils/validation";
import {
  RegisterFormStyle,
  RegisterTitle,
  RegisterButtonStyle,
  FlashMessage,
} from "portfolio/register/RegisterStyle";

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

    if (nameRegex(userName) && emailRegex(email) && passwordRegex(pw))
      setValidation(true);
    else setValidation(false);

    if (nameRegex(userName)) setValidName(true);
    else setValidName(false);

    if (emailRegex(email)) setValidEmail(true);
    else setValidEmail(false);

    if (passwordRegex(pw)) setValidPw(true);
    else setValidPw(false);
  }, [email, pw, pwCheck, userName]);

  useEffect(() => {
    if (!wrongPw && !isBlank && validation) setAllOk(true);
    else setAllOk(false);
  }, [wrongPw, isBlank, validation]);

  return (
    <RegisterFormStyle>
      <RegisterTitle> 레이서 포트폴리오 회원가입 </RegisterTitle>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
        />
        {email !== "" && !validEmail && (
          <FlashMessage>
            {" "}
            이메일 형식이 올바르지 않습니다. ex) abc@domain.com{" "}
          </FlashMessage>
        )}
      </div>
      <div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="비밀번호"
        />
        {pw !== "" && !validPw && (
          <FlashMessage>
            {" "}
            다음 중 한가지를 만족해주세요. <br /> 8자 이상: 특수문자, 영어, 숫자
            포함 <br /> 10자 이상: 특수문자, 영어, 숫자중 2종류 포함{" "}
          </FlashMessage>
        )}
      </div>
      <div>
        <input
          type="password"
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
          placeholder="비밀번호 확인"
        />
        {pwCheck !== "" && wrongPw && (
          <FlashMessage> 비밀번호가 일치하지 않습니다. </FlashMessage>
        )}
      </div>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="이름"
        />
        {userName !== "" && !validName && (
          <FlashMessage>
            {" "}
            이름에는 숫자 또는 특수문자가 포함될 수 없습니다. (20자 이내)
          </FlashMessage>
        )}
        {isBlank && <FlashMessage> 모든 항목을 채워주세요. </FlashMessage>}
      </div>
      <RegisterButtonStyle>
        <button onClick={registerHandler} disabled={!allOk}>
          {" "}
          회원가입{" "}
        </button>
      </RegisterButtonStyle>
    </RegisterFormStyle>
  );
};

export default RegisterForm;
