import styled from "styled-components";

export const NavStyle = styled.div`
  margin-bottom: 5rem;
  border-bottom: solid 2px rgba(0, 0, 255, 0.02);
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 4rem;
  background-color: white;
`;

export const NavBrand = styled.div`
  line-height: 4rem;
  padding-left: 3rem;
  font-size: 2rem;
`;

export const NavItem = styled.div`
  margin-right: 5vw;
  line-height: 3rem;

  a {
    float: right;
    color: rgb(100, 100, 100);
    font-size: 1.2rem;
    :hover {
      color: black;
    }
  }
`;
