import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "./LoginForm";

const Login = () => {
    const history = useHistory();
    const isLogin = useSelector((state) => state.auth);
    
    const registerHandler = () => {
      history.push('/register');
    }

    
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
