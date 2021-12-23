import React, { useState, useEffect } from "react";
import {
  ContentsFormStyle,
  ContentsFormInputStyle,
} from "portfolio/contents/ContentsStyle";
import { AiOutlineMinus } from "react-icons/ai";

const AwardForm = (props) => {
  const [award, setAward] = useState(props.formName);
  const [description, setDescription] = useState(props.formDescription);

  useEffect(() => {
    const newAwardData = props.awardData.map((item) =>
      item.id === props.formId
        ? {
            id: props.formId,
            name: award,
            description: description,
            user_id: props.formUserId,
          }
        : item
    );

    props.setAwardData(newAwardData);
  }, [award, description]);

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newAwardData = props.awardData.filter(
      (item) => item.id !== props.formId
    );
    props.setDeleteList(newDeleteList);
    props.setAwardData(newAwardData);
  };

  return (
    <ContentsFormStyle>
      <ContentsFormInputStyle>
        <input
          type="text"
          placeholder="상 이름"
          value={award}
          onChange={(e) => setAward(e.target.value)}
        />
        <input
          type="text"
          placeholder="내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </ContentsFormInputStyle>
      <AiOutlineMinus
        size="30"
        color="rgb(150, 150, 0)"
        title="삭제"
        onClick={deleteHandler}
      >
        {" "}
      </AiOutlineMinus>
    </ContentsFormStyle>
  );
};

export default AwardForm;
