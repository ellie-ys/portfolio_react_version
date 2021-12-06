import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CertificateFormStyle = styled.div`
  border: 1px solid green;
  padding: 3px;
  + div {
    margin-top: 20px;
  }
`;

const DatePickerStyle = styled.div`
  display: inline-block;
`;

const InnerFormStyle = styled.div`
  margin: 5px;
`;

const CertificateForm = (props) => {
  const [certificate, setCertificate] = useState(
    props.certificateData.filter((item) => item.id === props.formId)[0].name
  );
  const [agency, setAgency] = useState(
    props.certificateData.filter((item) => item.id === props.formId)[0].agency
  );
  const [date, setDate] = useState(
    props.certificateData.filter((item) => item.id === props.formId)[0].date
  );

  const changeNameHandler = (e) => {
    setCertificate(e.target.value);
  };

  const changeAgencyHandler = (e) => {
    setAgency(e.target.value);
  };

  const changeDateHandler = (date) => {
    setDate(moment(date).format("YYYY-MM-DD"));
  };

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
    <CertificateFormStyle>
      <InnerFormStyle>
        <input
          type="text"
          placeholder="자격증"
          value={certificate}
          onChange={changeNameHandler}
        />
      </InnerFormStyle>
      <InnerFormStyle>
        <input
          type="text"
          placeholder="발급 기관"
          value={agency}
          onChange={changeAgencyHandler}
        />
      </InnerFormStyle>
      <InnerFormStyle>
        <p>취득 날짜</p>
        <DatePickerStyle>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={formattedDate(date)}
            onChange={changeDateHandler}
          />
        </DatePickerStyle>
      </InnerFormStyle>
      <button onClick={deleteHandler}> 삭제 </button>
    </CertificateFormStyle>
  );
};

export default CertificateForm;
