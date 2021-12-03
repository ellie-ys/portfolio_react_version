import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  

  return(
    <div>
      <img></img>
      <p> 이름 </p>
      <span> 한줄 소개 </span>
      <button> 수정 </button>
    </div>
  );
}

export default Profile;
