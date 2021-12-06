import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const CertificateStyle = styled.div`
  border: solid 3px grey;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 15px;

  button {
    width: 30%;
    margin: 0 auto;
  }
`;

const Certificate = (props) => {
  useEffect(() => {
    console.log(props.certificateData);
  }, []);
  const [edit, setEdit] = useState(false);
  const [copyCertificateData, setCopyCertificateData] = useState(
    props.certificateData
  );
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
    const deleteResponse = await axios.post(
      BACKEND_URL + "/certificates/delete",
      deleteList.filter((item) => item > 0),
      header
    );
    const response = await axios.put(
      BACKEND_URL + "/certificates",
      props.certificateData,
      header
    );
    console.log(response.data);
    props.setCertificateData(response.data);
    setEdit(false);
    setNewIndex(0);
    setDeleteList([]);
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
    <CertificateStyle>
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

          <CertificateButtonWrapper>
            <button onClick={editCompleteHandler}> Complete </button>
            <button onClick={editCancelHandler}> Cancel </button>
            <button onClick={addCertificateDataHandler}> Add </button>
          </CertificateButtonWrapper>
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
          <CertificateButtonWrapper>
            <button onClick={editTriggerHandler}> Edit </button>
          </CertificateButtonWrapper>
        </div>
      )}
    </CertificateStyle>
  );
};

export default Certificate;
