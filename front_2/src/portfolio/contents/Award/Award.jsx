import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import AwardContents from "./AwardContents";
import AwardForm from "./AwardForm";

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

  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

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
    const deleteResponse = await axios.post(
      BACKEND_URL + "/awards/delete",
      deleteList.filter((item) => item > 0),
      header
    );
    const response = await axios.put(
      BACKEND_URL + "/awards",
      props.awardData,
      header
    );
    console.log(response.data);
    props.setAwardData(response.data);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
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
            <button onClick={editTriggerHandler}> Edit </button>
          </AwardButtonWrapper>
        </div>
      )}
    </AwardStyle>
  );
};

export default Award;
