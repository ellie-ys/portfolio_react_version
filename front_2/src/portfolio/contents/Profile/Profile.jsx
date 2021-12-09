import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/env";

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
  const user_id = useSelector((state) => state.user.user_id);
  const header = {
    headers: {
      "Content-Type": "multipart/form-data",
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

  const submitHandler = async (e) => {
    e.preventDefault();
    let fileToUpload = image;
    const formData = new FormData();

    formData.append("image", fileToUpload);
    formData.append("name", userName);
    formData.append("description", description);

    const response = await axios.post(
      BACKEND_URL + "/profiles",
      formData,
      header
    );

    props.setProfileData(response.data);
    setEdit(false);
  };

  const changeNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const changeImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const deleteImageHandler = (e) => {
    setImage(null);
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
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <ProfileFormStyle>
              <div>
                <input
                  type="file"
                  placeholder="이미지"
                  onChange={changeImageHandler}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="이름"
                  value={userName}
                  onChange={changeNameHandler}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="한줄소개"
                  value={description}
                  onChange={changeDescriptionHandler}
                />
              </div>
            </ProfileFormStyle>

            <ProfileButtonWrapper>
              <button type="submit"> Complete </button>
              <button onClick={editCancelHandler}> Cancel </button>
            </ProfileButtonWrapper>
          </form>
        </div>
      ) : (
        <div>
          <ProfileContentsStyle>
            {image === null ? (
              <div> No Image </div>
            ) : (
              <img
                src={`data:image/png;base64,${props.profileData.image}`}
                width="100px"
                alt="프로필사진"
              />
            )}

            <p> {props.profileData.name} </p>
            <p> {props.profileData.description} </p>
          </ProfileContentsStyle>
          <ProfileButtonWrapper>
            {user_id === props.userId && (
              <button onClick={editTriggerHandler}> Edit </button>
            )}
          </ProfileButtonWrapper>
        </div>
      )}
    </ProfileStyle>
  );
};

export default Profile;
