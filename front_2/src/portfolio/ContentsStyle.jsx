import styled from "styled-components";

export const ContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  + div {
    margin-top: 2rem;
  }
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
  grid-template-columns: 15fr 1fr;
  text-align: left;
  padding: 1rem;
  + div {
    margin-top: 20px;
    border-top: 2.5px solid rgba(100, 0, 100, 0.5);
  }

  svg {
    margin-top: 8rem;
    cursor: pointer;
  }
`;

export const ContentsInnerStyle = styled.div`
  text-align: left;
  padding: 1rem;
  width: 100%;
  + div {
    margin-top: 10px;
    border-top: 2.5px solid rgba(100, 0, 100, 0.5);
  }
`;

export const ContentsFormInputStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;

  & > input {
    width: 60%;
    line-height: 3rem;
  }
`;

export const ContentsRadioStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 70%;
  label {
    width: 100%;
  }
`;

export const DatePickerStyle = styled.div`
  display: inline-block;
`;

export const ProfileInnerStyle = styled.div`
  padding: 1rem;

  p {
    margin-top: 1rem;
  }
`;
