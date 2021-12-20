import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import EduContents from "portfolio/contents/Edu/EduContents";
import EduForm from "portfolio/contents/Edu/EduForm";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { eduDataValidation } from "utils/validation";

const EduStyle = styled.div`
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

const EduButtonWrapper = styled.div`
  margin-top: 20px;
`;

const Education = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyEduData, setCopyEduData] = useState(props.eduData);
  const [newIndex, setNewIndex] = useState(0);
  const [deleteList, setDeleteList] = useState([]);
  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const editTriggerHandler = () => {
    setCopyEduData(props.eduData);
    setEdit(true);
  };

  const editCancelHandler = () => {
    props.setEduData(copyEduData);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
  };

  const editCompleteHandler = async () => {
    if (!eduDataValidation(eduData)) {
      alert("모든 항목을 다 채워주세요.");
    } else {
      try {
        const deleteResponse = await axios.post(
          BACKEND_URL + "/edus/delete",
          deleteList.filter((item) => item > 0),
          header(access_token)
        );
        const response = await axios.put(
          BACKEND_URL + "/edus",
          eduData,
          header(access_token)
        );
        setEduData(response.data);
        setEdit(false);
        setNewIndex(0);
        setDeleteList([]);
      } catch (error) {
        if (error.response !== undefined && error.response.status === 401) {
          try {
            const refresh_response = await axios.post(
              BACKEND_URL + `/refresh/token`,
              { user_id: user_id }
            );
            const new_token = refresh_response.data.access_token;
            dispatch(refresh(new_token));
            const deleteResponse = await axios.post(
              BACKEND_URL + "/edus/delete",
              deleteList.filter((item) => item > 0),
              header(new_token)
            );
            const response = await axios.put(
              BACKEND_URL + "/edus",
              eduData,
              header(new_token)
            );
            setEduData(response.data);
            setEdit(false);
            setNewIndex(0);
            setDeleteList([]);
          } catch (error) {
            if (error.response !== undefined && error.response.status === 401) {
              // 토큰 재발급 실패시
              alert("로그인 세션이 만료 되었습니다.");
            } else {
              // 그 외 오류
              alert("예기치 못한 오류가 발생했습니다. 자동 로그아웃 됩니다.");
            }

            dispatch(logout());
            history.push("/login");
          }
        } else {
          // 토큰 만료가 아닌 다른 오류
          alert("예기치 못한 오류가 발생했습니다. 자동 로그아웃 됩니다.");
          dispatch(logout());
          history.push("/login");
        }
      }
    }
  };

  const addEduDataHandler = () => {
    const newEduData = props.eduData.concat({
      id: newIndex,
      name: "",
      major: "",
      edu_type: "",
      user_id: props.userId,
    });
    setNewIndex(newIndex - 1);
    props.setEduData(newEduData);
  };

  return (
    <EduStyle>
      <h2> Education </h2>
      {edit ? (
        <div>
          {props.eduData.map((element) => {
            return (
              <EduForm
                key={element.id}
                formId={element.id}
                formName={element.name}
                formMajor={element.major}
                formType={element.edu_type}
                formUserId={element.user_id}
                eduData={props.eduData}
                setEduData={props.setEduData}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
              />
            );
          })}

          <EduButtonWrapper>
            <button onClick={editCompleteHandler}> Complete </button>
            <button onClick={editCancelHandler}> Cancel </button>
            <button onClick={addEduDataHandler}> Add </button>
          </EduButtonWrapper>
        </div>
      ) : (
        <div>
          {props.eduData.map((element) => {
            return (
              <EduContents
                key={element.id}
                eduId={element.id}
                eduName={element.name}
                eduMajor={element.major}
                eduType={element.edu_type}
              />
            );
          })}

          <EduButtonWrapper>
            {user_id === props.userId && (
              <button onClick={editTriggerHandler}> Edit </button>
            )}
          </EduButtonWrapper>
        </div>
      )}
    </EduStyle>
  );
};

export default Education;
