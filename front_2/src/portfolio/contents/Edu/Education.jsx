import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../../../utils/env";
import EduContents from "./EduContents";
import EduForm from "./EduForm";

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
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

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
    const deleteResponse = await axios.post(
      BACKEND_URL + "/edus/delete",
      deleteList.filter((item) => item > 0),
      header
    );
    const response = await axios.put(
      BACKEND_URL + "/edus",
      props.eduData,
      header
    );
    console.log(response.data);
    props.setEduData(response.data);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
  };

  const addEduDataHandler = () => {
    const newEduData = props.eduData.concat({
      id: newIndex,
      name: "",
      major: "",
      type: "",
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
                formType={element.type}
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
                eduType={element.type}
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
