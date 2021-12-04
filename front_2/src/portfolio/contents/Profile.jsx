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

const Profile = (props) => {
  return (
    <ProfileStyle>
      <img></img>
      <p> {props.profileData.name} </p>
      <span> {props.profileData.description} </span>

      <button> Edit </button>
    </ProfileStyle>
  );
};

export default Profile;
