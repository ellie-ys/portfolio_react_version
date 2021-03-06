import React from "react";
import styled from "styled-components";

const ContainerFooter = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  color: #000000;
  box-sizing: border-box;
  justify-content: center;
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
