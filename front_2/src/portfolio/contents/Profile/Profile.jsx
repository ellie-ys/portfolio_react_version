import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { nameRegex } from "utils/validation";
import {
  ContentsStyle,
  ContentsButtonWrapper,
  ContentsFormStyle,
  ProfileInnerStyle,
  ContentsFormInputStyle,
} from "portfolio/contents/ContentsStyle";
import { BsPencilSquare, BsCheckBox } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";

const Profile = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyProfileData, setCopyProfileData] = useState(props.profileData);
  const [userName, setUserName] = useState(props.profileData.name);
  const [image, setImage] = useState(props.profileData.image);
  const [description, setDescription] = useState(props.profileData.description);

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
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (userName === "" || !nameRegex(userName)) {
      alert("이름은 필수입니다. (20자 이내)");
    } else {
      let fileToUpload = image;
      const formData = new FormData();

      formData.append("image", fileToUpload);
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
    <ContentsStyle>
      <h2>Profile</h2>
      {edit ? (
        <div>
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <ContentsFormStyle>
              <ContentsFormInputStyle>
                <input
                  type="file"
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
              </ContentsFormInputStyle>
            </ContentsFormStyle>

            <ContentsButtonWrapper>
              <BsCheckBox size="29" type="submit">
                {" "}
                Complete{" "}
              </BsCheckBox>
              <CgCloseR size="29" onClick={editCancelHandler}>
                {" "}
                Cancel{" "}
              </CgCloseR>
            </ContentsButtonWrapper>
          </form>
        </div>
      ) : (
        <div>
          <ProfileInnerStyle>
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
          </ProfileInnerStyle>
          <ContentsButtonWrapper>
            {user_id === props.userId && (
              <BsPencilSquare size="26" onClick={editTriggerHandler}>
                {" "}
                Edit{" "}
              </BsPencilSquare>
            )}
            
          </ContentsButtonWrapper>
        </div>
      )}
    </ContentsStyle>
  );
};

export default Profile;
