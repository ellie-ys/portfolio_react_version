export const passwordRegex = (password) => {
  let count = 0;
  if (password.length < 8) return false;
  if (password.search(/[a-zA-Z]/) !== -1) count++;
  if (password.search(/[0-9]/) !== -1) count++;
  if (password.search(/\W/) !== -1) count++;
  if (password.length < 10 && count < 3) return false;
  if (count < 2) return false;
  return true;
};

export const emailRegex = (email) => {
  if (email.length > 320) return false;
  const reg = new RegExp(
    "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$"
  );

  return reg.test(email);
};

export const nameRegex = (name) => {
  if (name.length > 20) return false;
  const reg = RegExp("^[가-힣]+$|^([a-zA-Z])+( [a-zA-Z]+)*$");

  return reg.test(name);
};

export const eduDataValidation = (eduData) => {
  let result = true;
  eduData.forEach((element) => {
    if (element.name === "") {
      result = false;
      return;
    }
    if (element.major === "") {
      result = false;
      return;
    }
    if (element.edu_type === "") {
      result = false;
      return;
    }
  });
  return result;
};

export const awardDataValidation = (awardData) => {
  let result = true;
  awardData.forEach((element) => {
    if (element.name === "") {
      result = false;
      return;
    }
    if (element.description === "") {
      result = false;
      return;
    }
  });
  return result;
};

export const certificateDataValidation = (certificateData) => {
  let result = true;
  certificateData.forEach((element) => {
    if (element.name === "") {
      result = false;
      return;
    }
    if (element.agency === "") {
      result = false;
      return;
    }
    if (element.date === "") {
      result = false;
      return;
    }
  });
  return result;
};

export const projectDataValidation = (projectData) => {
  let result = true;
  projectData.forEach((element) => {
    if (element.name === "") {
      result = false;
      return;
    }
    if (element.description === "") {
      result = false;
      return;
    }
    if (element.startdate === "") {
      result = false;
      return;
    }
    if (element.enddate === "") {
      result = false;
      return;
    }
  });
  return result;
};
