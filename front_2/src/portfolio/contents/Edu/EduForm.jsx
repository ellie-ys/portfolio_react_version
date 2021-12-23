import React, { useState, useEffect } from "react";
import {
  ContentsFormStyle,
  ContentsFormInputStyle,
  ContentsRadioStyle,
} from "portfolio/contents/ContentsStyle";
import { AiOutlineMinus } from "react-icons/ai";

const EduForm = (props) => {
  const [edu, setEdu] = useState(props.formName);
  const [major, setMajor] = useState(props.formMajor);
  const [type, setType] = useState(props.formType);

  useEffect(() => {
    const newEduData = props.eduData.map((item) =>
      item.id === props.formId
        ? {
            id: props.formId,
            name: edu,
            major: major,
            edu_type: type,
            user_id: props.formUserId,
          }
        : item
    );

    props.setEduData(newEduData);
  }, [edu, major, type]);

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newEduData = props.eduData.filter((item) => item.id !== props.formId);
    props.setDeleteList(newDeleteList);
    props.setEduData(newEduData);
  };

  return (
    <ContentsFormStyle>
      <ContentsFormInputStyle>
        <input
          type="text"
          placeholder="학교"
          value={edu}
          onChange={(e) => setEdu(e.target.value)}
        />

        <input
          type="text"
          placeholder="전공"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
        <ContentsRadioStyle>
          <label>
            {" "}
            <input
              name={props.formId}
              type="radio"
              value="재학"
              onChange={(e) => setType(e.target.value)}
              checked={type === "재학"}
            />{" "}
            재학{" "}
          </label>
          <label>
            {" "}
            <input
              name={props.formId}
              type="radio"
              value="졸업"
              onChange={(e) => setType(e.target.value)}
              checked={type === "졸업"}
            />{" "}
            졸업{" "}
          </label>
          <label>
            {" "}
            <input
              name={props.formId}
              type="radio"
              value="졸업예정"
              onChange={(e) => setType(e.target.value)}
              checked={type === "졸업예정"}
            />{" "}
            졸업예정{" "}
          </label>
          <label>
            {" "}
            <input
              name={props.formId}
              type="radio"
              value="중퇴"
              onChange={(e) => setType(e.target.value)}
              checked={type === "중퇴"}
            />{" "}
            중퇴{" "}
          </label>
        </ContentsRadioStyle>
      </ContentsFormInputStyle>
      <AiOutlineMinus
        size="30"
        color="rgb(150, 150, 0)"
        title="삭제"
        onClick={deleteHandler}
      >
        {" "}
        Delete{" "}
      </AiOutlineMinus>
    </ContentsFormStyle>
  );
};

export default EduForm;
