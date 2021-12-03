import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/action";
const LoginForm = () => {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(login({id: id, pw: pw}))
  };

  return(
    <>
    <form>
      <p>아이디</p><input type="text" value={id} onChange={e => setId(e.target.value)} />
      <p>비밀번호</p><input type="password" value={pw} onChange={e => setPw(e.target.value)} />
    </form>
    <button type="submit" onClick={clickHandler}> 로그인 </button>
    </>
  );
}

export default LoginForm;
