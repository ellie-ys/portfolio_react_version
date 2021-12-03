import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import {login} from "../../redux/action";

const LoginForm = () => {

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.auth);
    const history = useHistory();

    const loginHandler = () => {
        dispatch(login({id: id, pw: pw}));
        // isLogin ? history.push('/') : alert("로그인 실패");
        history.push('/');};


return(
    <>
    <form>
        <p>아이디</p><input type="text" value={id} onChange={e => setId(e.target.value)} />
        <p>비밀번호</p><input type="password" value={pw} onChange={e => setPw(e.target.value)} />
    </form>
    <button type="submit" onClick={loginHandler}> 로그인 </button>
    </>
);
}

export default LoginForm;
