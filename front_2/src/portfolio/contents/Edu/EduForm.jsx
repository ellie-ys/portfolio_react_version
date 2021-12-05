import React, {useState} from "react";
import styled from "styled-components";

const EduFormStyle = styled.div`
  border: 1px solid green;
  padding: 3px;
  + div{
    margin-top: 20px;
  }
`;

const EduForm = (props) => {

  const [edu, setEdu] = useState(props.eduData.filter(item => (item.id === props.formId))[0].name);
  const [major, setMajor] = useState(props.eduData.filter(item => (item.id === props.formId))[0].major);
  const [type, setType] = useState(props.eduData.filter(item => (item.id === props.formId))[0].type);

  const changeNameHandler = (e) => {
    setEdu(e.target.value);
    const newEduData = props.eduData.map(item => (item.id === props.formId ? {...item, name: e.target.value} : item));
    props.setEduData(newEduData);
  };

  const changeMajorHandler = (e) => {
    setMajor(e.target.value);
    const newEduData = props.eduData.map(item => (item.id === props.formId ? {...item, major: e.target.value} : item));
    props.setEduData(newEduData);
  };

  const changeTypeHandler = (e) => {
    setType(e.target.value)
    const newEduData = props.eduData.map(item => (item.id === props.formId ? {...item, type: e.target.value} : item));
    props.setEduData(newEduData);
  };

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newEduData = props.eduData.filter(item => item.id !== props.formId);
    props.setDeleteList(newDeleteList);
    props.setEduData(newEduData);
  };

  return(
    <EduFormStyle>
      <div>
        <input type="text" placeholder="학교" value={edu} onChange={changeNameHandler} />
      </div>
      <div>
        <input type="text" placeholder="전공" value={major} onChange={changeMajorHandler} />
      </div>
      <div>
        <label> <input name={props.formId} type="radio" value="재학" onChange={changeTypeHandler} checked={type==="재학"}/> 재학 </label>
        <label> <input name={props.formId} type="radio" value="졸업" onChange={changeTypeHandler} checked={type==="졸업"}/> 졸업 </label>
        <label> <input name={props.formId} type="radio" value="졸업예정" onChange={changeTypeHandler} checked={type==="졸업예정"}/> 졸업예정 </label>
        <label> <input name={props.formId} type="radio" value="중퇴" onChange={changeTypeHandler} checked={type==="중퇴"}/> 중퇴 </label>
      </div>
      <button onClick={deleteHandler}> 삭제 </button>
    </EduFormStyle>
  );
};

export default EduForm;
