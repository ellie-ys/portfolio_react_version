import React, { useState } from "react";
import { useSelector, useEffect } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../../env";

const ProfileStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  button {
    width: 30%;
    margin: 0 auto;
  }
`;
const ProfileButtonWrapper = styled.div`
  margin-top: 20px;
`;

const ProfileFormStyle = styled.div`
  border: 1px solid green;
  padding: 3px;
  + div {
    margin-top: 20px;
  }
`;

const ProfileContentsStyle = styled.div`
  border: solid 2px purple;

  + div {
    margin-top: 10px;
  }
`;

const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyProfileData, setCopyProfileData] = useState(props.profileData);
  const [userName, setUserName] = useState(props.profileData.name);
  const [image, setImage] = useState(props.profileData.image);
  const [description, setDescription] = useState(props.profileData.description);

  const access_token = useSelector((state) => state.user.access_token);

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const editTriggerHandler = () => {
    setCopyProfileData(props.profileData);
    setEdit(true);
  };

  const editCancelHandler = () => {
    setUserName(copyProfileData.name);
    setDescription(copyProfileData.description);
    setImage(copyProfileData.image);
    props.setProfileData(copyProfileData);
    setEdit(false);
  };

  const editCompleteHandler = async () => {
    // console.log(props.profileData);
    const response = await axios.put(
      BACKEND_URL + "/profiles",
      props.profileData,
      header
    );
    console.log(response.data);
    props.setProfileData(response.data);
    setEdit(false);
  };

  const changeNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const changeImageHandler = (e) => {
    setImage(e.target.value);
  };

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    const newProfileData = {
      id: props.formId,
      name: userName,
      description: description,
      image: image,
      user_id: props.formUserId,
    };

    props.setProfileData(newProfileData);
  }, [userName, description, image]);

  return (
    <ProfileStyle>
      <h2>Profile</h2>
      {edit ? (
        <div>
          <ProfileFormStyle>
            <div>
              <input
                type="file"
                placeholder="image"
                value={image}
                onChange={changeImageHandler}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="name"
                value={userName}
                onChange={changeNameHandler}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={changeDescriptionHandler}
              />
            </div>
          </ProfileFormStyle>

          <ProfileButtonWrapper>
            <button onClick={editCompleteHandler}> 완료 </button>
            <button onClick={editCancelHandler}> 취소 </button>
          </ProfileButtonWrapper>
        </div>
      ) : (
        <div>
          <ProfileContentsStyle>
            <img src={props.profileData.image} width="300px" alt="프로필사진" />
            <p> {props.profileData.name} </p>
            <p> {props.profileData.description} </p>
          </ProfileContentsStyle>
          <ProfileButtonWrapper>
            <button onClick={editTriggerHandler}> Edit </button>
          </ProfileButtonWrapper>
        </div>
      )}
    </ProfileStyle>
  );
};

export default Profile;
