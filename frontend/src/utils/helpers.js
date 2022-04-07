/**
 * Collection of useful or general purpose helper functions
 */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

 /**
 * A simple blank string checker.
 *
 * Checks null/undefined, type is actually a string,
 * and if length is less than 1.
 *
 * @param {string} inputStr The string to test
 */
export const isBlank = (inputStr) => (
  !inputStr
  || inputStr === null
  || typeof(inputStr) !== "string"
  || inputStr.length < 1
);

/**
 * Will calculate how long ago the given time is from
 * right now.
 *
 * @param {number} time Epoch time in milliseconds
 * @returns A formatted string (e.g. "2 days ago")
 */
export const timeAgo = (time) => {
  const postTime = dayjs(time);
  const now = dayjs(new Date());

  return postTime.from(now);
};

/**
 * Converts any string into capital-case form:
 *   e.g. INPUTSTRING --> Inputstring
 *
 * @param {string} str The string to convert
 * @returns A string in capital-case form
 */
export const convertToCapCase = (str) => {
  let retVal = "";

  if (str && !isBlank(str)) {
    const letters = str.split("");

    letters.forEach( (l, idx) => {
      if (idx === 0) {
        retVal += l.toUpperCase();
      } else {
        retVal += l.toLowerCase();
      }
    });
  }

  return retVal;
};
