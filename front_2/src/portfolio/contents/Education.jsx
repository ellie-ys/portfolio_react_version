import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "../../env";

const EduStyle = styled.div`
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

const EduContentsStyle = styled.div`
  border: solid 2px purple;

  + div {
    margin-top: 10px;
  }
`;

const EduContents = (props) => {
  return (
    <div>
      {props.eduData.map((element) => {
        return (
          <EduContentsStyle key={element.id}>
            <p> {element.name} </p>
            <p> {element.major} </p>
            <p> {element.type} </p>
          </EduContentsStyle>
        );
      })}
    </div>
  );
};

const EduForm = (props) => {
  return (
    <div>
      <p> 학력 </p>
      <div>
        <input
          type="text"
          placeholder="학교"
          value={props.formEdu}
          onChange={(e) => props.setFormEdu(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="전공"
          value={props.formMajor}
          onChange={(e) => props.setFormMajor(e.target.value)}
        />
      </div>
      <div>
        <label>
          {" "}
          <input
            name="type"
            type="radio"
            value="재학"
            onChange={(e) => props.setFormEduType(e.target.value)}
          />{" "}
          재학{" "}
        </label>
        <label>
          {" "}
          <input
            name="type"
            type="radio"
            value="졸업"
            onChange={(e) => props.setFormEduType(e.target.value)}
          />{" "}
          졸업{" "}
        </label>
        <label>
          {" "}
          <input
            name="type"
            type="radio"
            value="졸업예정"
            onChange={(e) => props.setFormEduType(e.target.value)}
          />{" "}
          졸업예정{" "}
        </label>
        <label>
          {" "}
          <input
            name="type"
            type="radio"
            value="중퇴"
            onChange={(e) => props.setFormEduType(e.target.value)}
          />{" "}
          중퇴{" "}
        </label>
      </div>
    </div>
  );
};

const Education = (props) => {
  const [edit, setEdit] = useState(false);
  const [edu, setEdu] = useState("");
  const [major, setMajor] = useState("");
  const [eduType, setEduType] = useState("");

  const access_token = useSelector((state) => state.user.access_token);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  const editTrueHandler = () => {
    setEdit(true);
  };

  const editCancelHandler = () => {
    setEdit(false);
  };

  const editFalseHandler = async () => {
    const eduData = {
      name: edu,
      major: major,
      type: eduType,
    };
    const response = await axios.post(
      BACKEND_URL + "/posts/edu",
      eduData,
      header
    );
    console.log(response.data);
    props.setEduData(response.data);
    setEdit(false);
  };

  return (
    <EduStyle>
      <h2> Education </h2>
      {edit ? (
        <div>
          <EduForm
            setFormEdu={setEdu}
            formEdu={edu}
            setFormMajor={setMajor}
            formMajor={major}
            setFormEduType={setEduType}
            formEduType={eduType}
          />
          <button onClick={editFalseHandler}> 완료 </button>
          <button onClick={editCancelHandler}> 취소 </button>
        </div>
      ) : (
        <div>
          <EduContents eduData={props.eduData} />
          <button onClick={editTrueHandler}> 수정 </button>
        </div>
      )}
    </EduStyle>
  );
};

export default Education;
