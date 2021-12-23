import styled from "styled-components";

export const ContentsStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.8rem;
  position: relative;

  h4 {
    padding-left: 1rem;
    padding-top: 1rem;
  }

  + div {
    margin-top: 2rem;
  }
  button {
    width: 30%;
    margin: 0 auto;
  }
`;

export const ContentsEditButtonWrapper = styled.span`
  margin-top: 20px;
  svg {
    cursor: pointer;
    float: right;
    margin-right: 1rem;
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 1rem;
    :hover {
      transform: scale(1.2);
    }
  }
`;

export const ContentsButtonWrapper = styled.span`
  margin-top: 20px;
  svg {
    cursor: pointer;
    float: right;
    margin-right: 1rem;
    margin-top: 1rem;
    :hover {
      transform: scale(1.2);
    }
  }
`;

export const ContentsFormStyle = styled.div`
  display: grid;
  grid-template-columns: 15fr 1fr;
  text-align: left;
  padding: 1rem;
  border: 1.5px solid rgba(0, 0, 100, 0.3);
  border-radius: 3px;

  + div {
    margin-top: 20px;
    

  svg {
    cursor: pointer;
    :hover{
      transform: scale(1.2);
    }

  }
`;

export const ContentsInnerStyle = styled.div`
  text-align: left;
  padding-left: 1rem;
  padding-top: 0.5rem;

  width: 100%;
  & :first-child {
    padding-top: 1rem;
  }

  + div {
    margin-top: 0em;
    border-top: 1.5px solid rgba(0, 0, 100, 0.3);
  }
  .date-content {
    color: gray;
    font-size: 0.9rem;
  }
`;

export const ContentsFormInputStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;

  & > input {
    width: 60%;
    line-height: 2.5rem;
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
  line-height: 2.5rem;
`;

export const ProfileInnerStyle = styled.div`
  padding: 1rem;

  border: 2px solid rgba(0, 0, 100, 0.3);
  border-radius: 5px;
  background-color: white;

  p {
    margin-top: 1rem;
  }
  img {
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    border: solid 1px rgba(0, 0, 100, 0.3);
    width: 9vw;
    height: 9vw;
  }

  svg {
    margin-right: 0rem;
  }
`;

export const ProfileFormInputStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.5rem;

  & > input {
    width: 100%;
    line-height: 3rem;
    border: 1px solid rgba(0, 0, 100, 0.3);
    border-radius: 3px;
  }

  #file-input {
    display: none;
  }

  label > img {
    cursor: pointer;

    :hover {
      background-color: rgba(50, 0, 150, 0.1);
      border: 2px solid rgba(0, 0, 100, 0.3);
    }
  }
`;

export const ProfileFormStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: left;
  padding: 0.3rem;
  + div {
    margin-top: 20px;
  }

  svg {
    cursor: pointer;

    :hover {
      transform: scale(1.2);
    }
  }
`;

export const ProfileContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 90%;

  h4 {
    padding-left: 1rem;
    padding-top: 1rem;
  }

  + div {
    margin-top: 2rem;
  }
  button {
    width: 30%;
    margin: 0 auto;
  }
`;

export const ProfileButtonWrapper = styled.span`
  margin-top: 20px;

  svg {
    cursor: pointer;
    float: right;
    margin-right: 1rem;
    margin-top: 1rem;
    :hover {
      transform: scale(1.2);
    }
  }
`;
