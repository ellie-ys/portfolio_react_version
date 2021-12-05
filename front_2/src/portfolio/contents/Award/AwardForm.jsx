import React, { useState } from "react";
import styled from "styled-components";

const AwardFormStyle = styled.div`
  border: 1px solid green;
  padding: 3px;
  + div {
    margin-top: 20px;
  }
`;

const AwardForm = (props) => {
  const [award, setAward] = useState(
    props.awardData.filter((item) => item.id === props.formId)[0].name
  );
  const [description, setDescription] = useState(
    props.awardData.filter((item) => item.id === props.formId)[0].description
  );

  const changeNameHandler = (e) => {
    setAward(e.target.value);
    const newAwardData = props.awardData.map((item) =>
      item.id === props.formId ? { ...item, name: e.target.value } : item
    );
    props.setAwardData(newAwardData);
  };

  const changeDescriptionHandler = (e) => {
    setDescription(e.target.value);
    const newAwardData = props.awardData.map((item) =>
      item.id === props.formId ? { ...item, description: e.target.value } : item
    );
    props.setAwardData(newAwardData);
  };

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newAwardData = props.awardData.filter(
      (item) => item.id !== props.formId
    );
    props.setDeleteList(newDeleteList);
    props.setAwardData(newAwardData);
  };

  return (
    <AwardFormStyle>
      <div>
        <input
          type="text"
          placeholder="상 이름"
          value={award}
          onChange={changeNameHandler}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="내용"
          value={description}
          onChange={changeDescriptionHandler}
        />
      </div>
      <button onClick={deleteHandler}> 삭제 </button>
    </AwardFormStyle>
  );
};

export default AwardForm;
