export const isEmailValid = (email) => {
  if (email.includes("@") && email.length > 5) {
    return true;
  }
  return false;
};

export const limitWords = (text, limit) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};
