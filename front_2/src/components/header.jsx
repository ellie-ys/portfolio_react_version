import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const HeaderContainer = styled.div`
  letter-spacing: 0.01em;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #dabff3;
  box-sizing: border-box;
  li {
    cursor: pointer;
  }
`;

export default function Header() {
  let history = useHistory();

  const handleLogoutButton = async () => {
    try {
      if (window.confirm("로그아웃하시겠습니까?")) {
        await axios.get(`http://127.0.0.1:5000/logout`);
        window.sessionStorage.clear();

        alert("로그아웃 되었습니다.");
        history.push("/login");
      }
    } catch (e) {
      if (e.response.status === "401") {
        alert("로그아웃 되었습니다.");
        window.sessionStorage.clear();
        history.push("/login");
      }
    }
  };
  return (
    <HeaderContainer>
      <h1>RacerIn</h1>

      <nav>
        <ul>
          <li onClick={() => history.push("/")}>메인</li>
          <li onClick={() => history.push("/elicer")}>네트워크</li>
          <li
            onClick={() => {
              handleLogoutButton();
            }}
          >
            로그아웃
          </li>
        </ul>
      </nav>
    </HeaderContainer>
  );
}
