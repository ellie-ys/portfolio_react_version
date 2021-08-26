import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();

  return (
    <HeaderContainer>
      <h1>RacerIn</h1>
      {
        <nav>
          <ul>
            <li onClick={() => history.push("/")}>메인</li>
            <li onClick={() => history.push("/elicer")}>네트워크</li>
            <li onClick={() => history.push("/logout")}>로그아웃</li>
          </ul>
        </nav>
      }
    </HeaderContainer>
  );
}
