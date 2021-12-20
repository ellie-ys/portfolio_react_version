import React, { useState, useEffect } from "react";
import { ContentsFormStyle } from 'portfolio/contents/ContentsStyle';

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
      <div>
        <input
          type="text"
          placeholder="상 이름"
          value={award}
          onChange={(e) => setAward(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="내용"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={deleteHandler}> 삭제 </button>
    </ContentsFormStyle>
  );
};

export default AwardForm;
