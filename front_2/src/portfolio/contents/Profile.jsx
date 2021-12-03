import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  

  return(
    <div>
      <img></img>
      <p> name </p>
      <span> description </span>
      <button> Edit </button>
    </div>
  );
}

export default Profile;
