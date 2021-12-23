import styled from "styled-components";

export const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 8rem;
`;

export const MainContents = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  grid-template-columns: 1fr 1.8fr;
  column-gap: 7rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const ProfileStyle = styled.div`
  padding: 0;
`;

export const PortfolioStyle = styled.div`
  width: 100%;

  & > div {
    border: 2px solid rgba(0, 0, 100, 0.3);
    border-radius: 5px;
    background-color: white;
  }
`;
