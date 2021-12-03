import React from "react";
import styled from "styled-components";

const ContainerFooter = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  color: #000000;
  box-sizing: border-box;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
`;

function Footer() {
  return (
    <ContainerFooter>
      <p className="footer">
        Copyright ⓒ 2016 - 2021 elice. All rights reserved
      </p>
    </ContainerFooter>
  );
}
export default Footer;
