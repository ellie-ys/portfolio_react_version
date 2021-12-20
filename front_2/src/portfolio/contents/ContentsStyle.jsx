import styled from "styled-components";

export const ContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  + div {
    margin-top: 2rem;
  }
G
  button {
    width: 30%;
    margin: 0 auto;
  }
`;

export const ContentsButtonWrapper = styled.span`
  margin-top: 20px;
  svg {
    cursor: pointer;
    float: right;
    margin-right: 2rem;
  }
`;

export const ContentsFormStyle = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  text-align: left;
  padding: 1rem;
  + div {
    margin-top: 20px;
    border-top: 2.5px solid rgba(100, 0, 100, 0.5);
  }
`;

export const ContentsInnerStyle = styled.div`
  text-align: left;
  padding: 1rem;
  + div {
    margin-top: 10px;
    border-top: 2.5px solid rgba(100, 0, 100, 0.5);
  }
`;

export const ProfileInnerStyle = styled.div`
  padding: 1rem;
`;
