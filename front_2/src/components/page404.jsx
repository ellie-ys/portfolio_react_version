import { Redirect, useHistory } from "react-router";

const NotFoundPage = ({ loginId }) => {
  const history = useHistory();
  return (
    <div>
      {loginId === null && <Redirect to="/login" />}
      <h2>존재하지 않는 페이지 입니다.</h2>
      <button onClick={() => history.push("/register")}>
        회원가입 화면으로 돌아가기
      </button>
    </div>
  );
};

export default NotFoundPage;
