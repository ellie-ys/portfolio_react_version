import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  ContentsFormStyle,
  ContentsFormInputStyle,
} from "portfolio/contents/ContentsStyle";
import { BsTrash } from "react-icons/bs";

const CertificateForm = (props) => {
  const [certificate, setCertificate] = useState(props.formName);
  const [agency, setAgency] = useState(props.formAgency);
  const [date, setDate] = useState(props.formDate);

  useEffect(() => {
    const newCertificateData = props.certificateData.map((item) =>
      item.id === props.formId
        ? {
            id: props.formId,
            name: certificate,
            agency: agency,
            date: date,
            user_id: props.formUserId,
          }
        : item
    );

    props.setCertificateData(newCertificateData);
  }, [certificate, agency, date]);

  const deleteHandler = () => {
    const newDeleteList = props.deleteList.concat(props.formId);
    const newCertificateData = props.certificateData.filter(
      (item) => item.id !== props.formId
    );
    props.setDeleteList(newDeleteList);
    props.setCertificateData(newCertificateData);
  };

  const formattedDate = (sdate) => {
    if (typeof sdate === "string") {
      const dateArr = sdate.split("-");
      return new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
    } else return sdate;
  };

  return (
    <ContentsFormStyle>
      <ContentsFormInputStyle>
        <input
          type="text"
          placeholder="자격증"
          value={certificate}
          onChange={(e) => setCertificate(e.target.value)}
        />
        <input
          type="text"
          placeholder="발급 기관"
          value={agency}
          onChange={(e) => setAgency(e.target.value)}
        />

        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={formattedDate(date)}
          onChange={(date) => setDate(moment(date).format("YYYY-MM-DD"))}
        />
      </ContentsFormInputStyle>
      <BsTrash size="30" onClick={deleteHandler}>
        {" "}
        Delete{" "}
      </BsTrash>
    </ContentsFormStyle>
  );
};

export default CertificateForm;
