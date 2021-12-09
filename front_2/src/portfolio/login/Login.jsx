import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "portfolio/login/LoginForm";

const Login = () => {
  const history = useHistory();
  const isLogin = useSelector((state) => state.user.isLoggedIn);
  const user_id = useSelector((state) => state.user.user_id);

  useEffect(() => {
    if (isLogin) {
      history.push("/");
      history.push(`/main?user=${user_id}`);
    }
  }, []);

  const registerHandler = () => {
    history.push("/register");
  };

  return (
    <div>
      <LoginForm />
      <div>
        <button> 구글계정으로 로그인</button>
      </div>
      <div>
        <button onClick={registerHandler}> 회원가입하기 </button>
      </div>
    </div>
  );
};

export default Login;
