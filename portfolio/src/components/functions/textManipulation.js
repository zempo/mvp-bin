export const capitalizeStr = (str) => {
  let firstLetter = str.slice(0).toUpperCase();

  return firstLetter + str.slice(1);
};
