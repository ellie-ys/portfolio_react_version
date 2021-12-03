import React from "react";

import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <LoginForm />
      <div>
        <button> 구글계정으로 로그인</button>
      </div>
      <div>
        <button> 회원가입하기 </button>
      </div>
    </div>
  );
};

export default Login;
