/**
 * GENERAL HELPER UTILITY FUNCTIONS
 * --------------------------------
 *
 * Custom lodash-like functions to modify text
 * throughout this project.
 */

export const shortenWord = (str, size) => {
  if (str.length <= size) return str;

  return `${str.slice(0, size)}...`;
};

export const capitalizeStr = (str) => {
  if (typeof str !== "string") return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const returnYear = () => {
  let d = new Date();
  return d.getFullYear();
};

export const getHours = (str) => {
  let timeStr = str;
  let timeStart = timeStr.indexOf(",") + 2;
  let timeEnd = timeStr.substr(timeStart).indexOf("M");

  if (timeStr.substr(timeStart)[0] === "0") {
    timeStart += 1;
  }

  timeStr = timeStr
    .substr(timeStart, timeEnd)
    .replace(":00 ", " ")
    .toLowerCase();
  return timeStr;
};

export const getClientTime = () => {
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: clientTimezone,
    timeZoneName: "short",
  };
  const formater = new Intl.DateTimeFormat("en-US", options);
  const startingDate = new Date("2020/04/10 15:00:00 +0000");
  const endingDate = new Date("2020/04/10 23:30:00 +0000");

  let pacificStart = formater.format(startingDate);
  pacificStart = getHours(pacificStart);
  let pacificEnd = formater.format(endingDate);
  pacificEnd = getHours(pacificEnd);
  return [pacificStart, pacificEnd];
};
