import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "portfolio/login/LoginForm";
import { LoginStyle } from "portfolio/login/LoginStyle";

const Login = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.isLogined);
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    if (isLogin) {
      console.log("already logined!");
      history.push("/");
      history.push(`/main?user=${user_id}`);
    }
  }, []);

  const registerHandler = () => {
    history.push("/register");
  };

  return (
    <LoginStyle>
      <LoginForm />
      {/* <LoginButtonStyle>
        <button> 구글계정으로 로그인</button>
        <button onClick={registerHandler}> 회원가입하기 </button>
      </LoginButtonStyle> */}
    </LoginStyle>
  );
};

export default Login;
