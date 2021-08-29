export const emailValidation = (email) => {
  const regExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;
  const result = email.match(regExp) !== null;
  return result;
};



export const passwordValidation = (password) => {
  let count = 0;
  if (password.search(/[a-zA-Z]/) > -1) {
      count++;
  }
  if (password.search(/[0-9]/) > -1) {
      count++;
  }
  if (password.search(/[\W]/) > -1) {
      count++;
  }

  if (count === 2 && password.length >= 10) {
      return true;
  } else if (count === 3 && password.length >= 8) {
      return true;
  }

  return false;
}

export const password2Validation = (password, password2) => {
  const result = password === password2;
  return result;
}

export const nameValidation = (name) => {
  const regExp = /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/i;
  const result = name.search(regExp) === -1 && name.length > 0;
  return result;
}

export const startToEndDateValidation = (startDate, endDate) => {
  return new Date(startDate) <= new Date(endDate);
}

export const currentDateValidation = (date) => {
  return new Date(date) <= new Date();
}