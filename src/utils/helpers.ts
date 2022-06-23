function checkUppercase(str: string){
  for (let i= 0; i < str.length; i++){
    if (str.charAt(i) === str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
      return true;
    }
  }
  return false;
};

function checkNumber(str: string) {
  return /\d/.test(str);
}

function checkSpecialCharacters(str: string) {
  return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);
}

export const ValidateEmail = (mail: string) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
}

export const ValidatePassword = (password: string) => {
  return password.length >= 8 && checkUppercase(password) && checkNumber(password) && checkSpecialCharacters(password);
}