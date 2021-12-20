import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import AwardContents from "portfolio/contents/Award/AwardContents";
import AwardForm from "portfolio/contents/Award/AwardForm";
import { BACKEND_URL } from "utils/env";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { awardDataValidation } from "utils/validation";
const AwardStyle = styled.div`
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

const AwardButtonWrapper = styled.div`
  margin-top: 20px;
`;

const Award = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyAwardData, setCopyAwardData] = useState(props.awardData);
  const [newIndex, setNewIndex] = useState(0);
  const [deleteList, setDeleteList] = useState([]);

  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const editTriggerHandler = () => {
    setCopyAwardData(props.awardData);
    setEdit(true);
  };

  const editCancelHandler = () => {
    props.setAwardData(copyAwardData);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
  };

  const editCompleteHandler = async () => {
    if (!awardDataValidation(awardData)) {
      alert("모든 항목을 다 채워주세요.");
    } else {
      try {
        const deleteResponse = await axios.post(
          BACKEND_URL + "/awards/delete",
          deleteList.filter((item) => item > 0),
          header(access_token)
        );
        const response = await axios.put(
          BACKEND_URL + "/awards",
          awardData,
          header(access_token)
        );
        setAwardData(response.data);
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
              BACKEND_URL + "/awards/delete",
              deleteList.filter((item) => item > 0),
              header(new_token)
            );
            const response = await axios.put(
              BACKEND_URL + "/awards",
              awardData,
              header(new_token)
            );
            setAwardData(response.data);
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

  const addAwardDataHandler = () => {
    const newAwardData = props.awardData.concat({
      id: newIndex,
      name: "",
      description: "",
      user_id: props.userId,
    });
    setNewIndex(newIndex - 1);
    props.setAwardData(newAwardData);
  };

  return (
    <AwardStyle>
      <h2> Award </h2>
      {edit ? (
        <div>
          {props.awardData.map((element) => {
            return (
              <AwardForm
                key={element.id}
                formId={element.id}
                formName={element.name}
                formDescription={element.description}
                formUserId={element.user_id}
                awardData={props.awardData}
                setAwardData={props.setAwardData}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
              />
            );
          })}

          <AwardButtonWrapper>
            <button onClick={editCompleteHandler}> Complete </button>
            <button onClick={editCancelHandler}> Cancel </button>
            <button onClick={addAwardDataHandler}> Add </button>
          </AwardButtonWrapper>
        </div>
      ) : (
        <div>
          {props.awardData.map((element) => {
            return (
              <AwardContents
                key={element.id}
                awardId={element.id}
                awardName={element.name}
                awardDescription={element.description}
              />
            );
          })}
          <AwardButtonWrapper>
            {user_id === props.userId && (
              <button onClick={editTriggerHandler}> Edit </button>
            )}
          </AwardButtonWrapper>
        </div>
      )}
    </AwardStyle>
  );
};

export default Award;
