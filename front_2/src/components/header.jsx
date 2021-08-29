import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { logoutRequest } from "../apis/auth";

const HeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  font-size: 1.1rem;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
  justify-content: space-between;
  background-color: #a593e0;
  box-sizing: border-box;
  color: #eeeeee;
  font-size: 150%;

  ul {
    display: flex;
  }

  li {
    cursor: pointer;
    transition: all 100ms ease-in-out 0ms;
  }

  li:hover {
    transform: scale(1.1);
  }

  li + li {
    margin-left: 20px;
  }
`;

export default function Header({ loginId, setLoginId }) {
  let history = useHistory();

  const handleLogoutButton = async () => {
    try {
      if (window.confirm("로그아웃하시겠습니까?")) {
        await logoutRequest();
        window.sessionStorage.clear();
        setLoginId(null);
        alert("로그아웃 되었습니다.");
        history.push("/login");
      }
    } catch (e) {
      alert("로그아웃 되었습니다.");
      window.sessionStorage.clear();
      history.push("/login");
    }
  };
  return (
    <HeaderContainer>
      <h1>RacerIn</h1>
      {loginId && (
        <nav>
          <ul>
            <li>
              <Link to="/">메인</Link>
            </li>
            <li>
              <Link to="/network">네트워크</Link>
            </li>
            <li
              onClick={() => {
                handleLogoutButton();
              }}
            >
              로그아웃
            </li>
          </ul>
        </nav>
      )}
    </HeaderContainer>
  );
}
