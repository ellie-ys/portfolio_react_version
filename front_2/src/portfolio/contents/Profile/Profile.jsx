import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { nameRegex } from "utils/validation";
import {
  ContentsButtonWrapper,
  ProfileInnerStyle,
  ProfileFormInputStyle,
  ProfileFormStyle,
  ProfileContentStyle,
  ProfileButtonWrapper,
} from "portfolio/contents/ContentsStyle";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyProfileData, setCopyProfileData] = useState(props.profileData);
  const [userName, setUserName] = useState(props.profileData.name);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(props.profileData.description);
  const [imageHash, setImageHash] = useState(Date.now());

  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

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
    setImage(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userName === "" || !nameRegex(userName)) {
      alert("이름은 필수입니다. (20자 이내)");
    } else {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("name", userName);
      formData.append("description", description);

      try {
        const response = await axios.post(
          BACKEND_URL + "/profiles",
          formData,
          header(access_token)
        );
        setProfileData(response.data);
        setEdit(false);
        setImageHash(Date.now());
      } catch (error) {
        if (error.response !== undefined && error.response.status === 401) {
          try {
            const refresh_response = await axios.post(
              BACKEND_URL + `/refresh/token`,
              { user_id: user_id }
            );
            const new_token = refresh_response.data.access_token;
            dispatch(refresh(new_token));
            const response = await axios.post(
              BACKEND_URL + "/profiles",
              formData,
              header(new_token)
            );
            setProfileData(response.data);
            setEdit(false);
          } catch (err) {
            alert("로그인 세션이 만료 되었습니다.");
            dispatch(logout());
            history.push("/login");
          }
        }
      }
    }
  };

  const deleteImageHandler = (e) => {
    setImage(null);
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
    <ProfileContentStyle>
      {edit ? (
        <ProfileInnerStyle>
          <ProfileFormStyle>
            <ProfileFormInputStyle>
              <label for="file-input">
                {image === null ? (
                  <img src={`${props.profileData.image}?${imageHash}`} />
                ) : (
                  <img src={URL.createObjectURL(image)} />
                )}
              </label>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                placeholder="이미지"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="이름"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="text"
                placeholder="한줄소개"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ProfileFormInputStyle>
          </ProfileFormStyle>
          <ProfileButtonWrapper>
            <AiOutlineCheck
              size="30"
              color="rgb(0, 150, 0)"
              title="완료"
              type="submit"
              onClick={submitHandler}
            >
              {" "}
            </AiOutlineCheck>
            <AiOutlineClose
              size="30"
              color="rgb(150, 0, 0)"
              title="취소"
              onClick={editCancelHandler}
            >
              {" "}
            </AiOutlineClose>
          </ProfileButtonWrapper>
        </ProfileInnerStyle>
      ) : (
        <ProfileInnerStyle>
          {props.profileData.image === null ? (
            <img src="https://$$#$#.png" alt="프로필사진" />
          ) : (
            <img
              src={`${props.profileData.image}?${imageHash}`}
              alt="프로필사진"
            />
          )}
          <p style={{ fontSize: "1.3rem", textAlign: "center" }}>
            {" "}
            {profileData.name}{" "}
          </p>
          <p style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
            {" "}
            {profileData.description}{" "}
          </p>
          <ContentsButtonWrapper>
            {user_id === props.userId && (
              <BsPencilSquare
                size="26"
                color="rgb(100, 100, 200)"
                onClick={editTriggerHandler}
              >
                {" "}
                Edit{" "}
              </BsPencilSquare>
            )}
          </ContentsButtonWrapper>
        </ProfileInnerStyle>
      )}
    </ProfileContentStyle>
  );
};

export default Profile;
