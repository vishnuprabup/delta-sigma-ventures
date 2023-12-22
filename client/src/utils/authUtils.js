export const isEmailValid = (email) => {
  if (email.includes("@") && email.length > 5) {
    return true;
  }
  return false;
};
