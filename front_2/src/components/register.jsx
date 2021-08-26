import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const history = useHistory();

  const registerRequest = async () => {
    try {
      await axios.post(`http://127.0.0.1:5000/register`, {
        email,
        password,
        name,
      });
      history.push("/register");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerRequest();
  };
  return (
    <div>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type="submit">회원가입</button>

        <button type="button" onClick={() => history.push("/")}>
          구글계정으로 로그인하기
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
