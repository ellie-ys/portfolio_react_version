import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "utils/env";
import EduContents from "portfolio/contents/Edu/EduContents";
import EduForm from "portfolio/contents/Edu/EduForm";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { eduDataValidation } from "utils/validation";
import {
  ContentsStyle,
  ContentsButtonWrapper,
  ContentsEditButtonWrapper,
} from "./contents/ContentsStyle";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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
    <ContentsStyle>
      <h4> Education </h4>
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
          <ContentsButtonWrapper>
            <AiOutlinePlus
              size="30"
              color="rgb(0, 150, 255)"
              title="추가"
              onClick={addEduDataHandler}
            >
              {" "}
            </AiOutlinePlus>
            <AiOutlineCheck
              size="30"
              color="rgb(0, 150, 0)"
              title="완료"
              onClick={editCompleteHandler}
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
          </ContentsButtonWrapper>
        </div>
      ) : (
        <div>
          {eduData.map((element) => {
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
          <ContentsEditButtonWrapper>
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
          </ContentsEditButtonWrapper>
        </div>
      )}
    </ContentsStyle>
  );
};

export default Education;
