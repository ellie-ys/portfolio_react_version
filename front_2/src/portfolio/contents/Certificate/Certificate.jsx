import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import CertificateContents from "portfolio/contents/Certificate/CertificateContents";
import CertificateForm from "portfolio/contents/Certificate/CertificateForm";
import { BACKEND_URL } from "utils/env";

import moment from "moment";
import { useDispatch } from "react-redux";
import { logout, refresh } from "redux/action";
import { useHistory } from "react-router";
import { certificateDataValidation } from "utils/validation";
import {
  ContentsStyle,
  ContentsButtonWrapper,
} from "portfolio/contents/ContentsStyle";
import { BsPencilSquare, BsPlusSquare, BsCheckBox } from "react-icons/bs";
import { CgCloseR } from "react-icons/cg";

const Certificate = (props) => {
  const [edit, setEdit] = useState(false);
  const [copyCertificateData, setCopyCertificateData] = useState(
    props.certificateData
  );
  const [newIndex, setNewIndex] = useState(0);
  const [deleteList, setDeleteList] = useState([]);

  const access_token = useSelector((state) => state.user.access_token);
  const user_id = useSelector((state) => state.user.user_id);
  const dispatch = useDispatch();
  const history = useHistory();

  const editTriggerHandler = () => {
    setCopyCertificateData(props.certificateData);
    setEdit(true);
  };

  const editCancelHandler = () => {
    props.setCertificateData(copyCertificateData);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
  };

  const editCompleteHandler = async () => {
    if (!certificateDataValidation(certificateData)) {
      alert("모든 항목을 다 채워주세요.");
    } else {
      try {
        const deleteResponse = await axios.post(
          BACKEND_URL + "/certificates/delete",
          deleteList.filter((item) => item > 0),
          header(access_token)
        );
        const response = await axios.put(
          BACKEND_URL + "/certificates",
          certificateData,
          header(access_token)
        );
        setCertificateData(response.data);
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
              BACKEND_URL + "/certificates/delete",
              deleteList.filter((item) => item > 0),
              header(new_token)
            );
            const response = await axios.put(
              BACKEND_URL + "/certificates",
              certificateData,
              header(new_token)
            );
            setCertificateData(response.data);
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

  const addCertificateDataHandler = () => {
    const newCertificateData = props.certificateData.concat({
      id: newIndex,
      name: "",
      agency: "",
      date: moment(new Date()).format("YYYY-MM-DD"),
      user_id: props.userId,
    });
    setNewIndex(newIndex - 1);
    props.setCertificateData(newCertificateData);
  };

  return (
    <ContentsStyle>
      <h2> Certificate </h2>
      {edit ? (
        <div>
          {props.certificateData.map((element) => {
            return (
              <CertificateForm
                key={element.id}
                formId={element.id}
                formName={element.name}
                formAgency={element.agency}
                formDate={element.date}
                formUserId={element.user_id}
                certificateData={props.certificateData}
                setCertificateData={props.setCertificateData}
                deleteList={deleteList}
                setDeleteList={setDeleteList}
              />
            );
          })}

          <ContentsButtonWrapper>
            <BsPlusSquare size="26" onClick={addCertificateDataHandler}>
              {" "}
              Add{" "}
            </BsPlusSquare>
            <BsCheckBox size="29" onClick={editCompleteHandler}>
              {" "}
              Complete{" "}
            </BsCheckBox>
            <CgCloseR size="29" onClick={editCancelHandler}>
              {" "}
              Cancel{" "}
            </CgCloseR>
          </ContentsButtonWrapper>
        </div>
      ) : (
        <div>
          {props.certificateData.map((element) => {
            return (
              <CertificateContents
                key={element.id}
                certificateId={element.id}
                certificateName={element.name}
                certificateAgency={element.agency}
                certificateDate={element.date}
              />
            );
          })}
          <ContentsButtonWrapper>
            {user_id === props.userId && (
              <BsPencilSquare size="26" onClick={editTriggerHandler}>
                {" "}
                Edit{" "}
              </BsPencilSquare>
            )}
          </ContentsButtonWrapper>
        </div>
      )}
    </ContentsStyle>
  );
};

export default Certificate;
