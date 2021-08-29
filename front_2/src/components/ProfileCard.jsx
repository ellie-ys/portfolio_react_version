import React, { useState, useRef } from "react";
import { useHistory } from "react-router";
import produce from "immer";
import styled, { css } from "styled-components";

import * as userApi from "../apis/elicer";
import * as PortfolioCard from "./portfolio/portfolio";

const ProfileCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  background-color: #222831;
  color: #eeeeee;
  text-align: center;
  margin: 10px;
  ${(props) =>
    props.link &&
    css`
      cursor: pointer;
      :hover {
        transform: scale(1.05);
      }
    `}
  * + * {
    margin-top: 10px;
  }

  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    margin-bottom: 20px;
  }
`;

const ProfileForm = styled.form`
  > input {
    width: 100%;
    padding: 5px;
    font-size: 14px;
    box-sizing: border-box;
  }
  button + button {
    margin-left: 5px;
  }
`;
const EditProfileForm = ({ user, onSave, onCancle }) => {
  const [name, setName] = useState(user.name);
  const [description, setDescription] = useState(user.description || "");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (typeof onSave !== "function") {
      return;
    }

    onSave(name, description);
  };
  return (
    <ProfileForm onSubmit={handleProfileSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름"
      />
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="한 줄 소개"
      />
      <PortfolioCard.Button type="button" onClick={onCancle}>
        취소
      </PortfolioCard.Button>
      <PortfolioCard.Button type="submit">저장</PortfolioCard.Button>
    </ProfileForm>
  );
};

const ProfileCard = ({
  user,
  onClick,
  isEditAble,
  setLoginId,
  setPortfolio,
  link,
}) => {
  const [edit, setEdit] = useState(false);
  const history = useHistory();
  const inputImageButton = useRef(null);

  const handleCardClick = (e) => {
    if (typeof onClick !== "function") {
      return;
    }
    const userId = e.currentTarget.dataset.id;
    onClick(userId);
  };

  const handleUpdateSave = async (name, description) => {
    try {
      await userApi.updateUserRequest(user.id, name, description);
      const data = await userApi.getUserRequest(user.id);
      setEdit(false);
      setPortfolio(
        produce((draft) => {
          draft.user = data;
        })
      );
    } catch (e) {
      if (e.response.status === 401) {
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  const handleCancleUpdate = () => {
    setEdit(false);
  };

  const handleImageClick = () => {
    if (isEditAble) {
      inputImageButton.current.click();
    }
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    if (image === undefined) {
      return;
    }

    try {
      await userApi.getUserRequest(user.id);
      const data = await userApi.getUserRequest(user.id);
      setPortfolio(
        produce((draft) => {
          draft.user = data;
        })
      );
    } catch (e) {
      if (e.response.status === 401) {
        window.sessionStorage.clear();
        setLoginId(null);
        history.push("/login");
      }
    }
  };

  return (
    <ProfileCardWrapper onClick={handleCardClick} data-id={user.id} link={link}>
      <img
        src={user.image ? user.image : "logo192.png"}
        alt="프로필 이미지"
        onClick={handleImageClick}
        style={isEditAble ? { cursor: "pointer" } : {}}
      />
      <input
        ref={inputImageButton}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      {edit ? (
        <EditProfileForm
          user={user}
          onSave={handleUpdateSave}
          onCancle={handleCancleUpdate}
        />
      ) : (
        <>
          <span>{user.name}</span>
          <p>{user.description ? user.description : "한 줄 소개"}</p>
          {isEditAble && (
            <PortfolioCard.Button onClick={() => setEdit(true)}>
              수정
            </PortfolioCard.Button>
          )}
        </>
      )}
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
