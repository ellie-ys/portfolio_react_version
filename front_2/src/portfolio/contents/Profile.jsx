import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfileStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  & > button {
    width: 30%;
    margin: 0 auto;
  }
`;

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <ProfileStyle>
      <img></img>
      <p> name </p>
      <span> description </span>
      <button> Edit </button>
    </ProfileStyle>
  );
};

export default Profile;
