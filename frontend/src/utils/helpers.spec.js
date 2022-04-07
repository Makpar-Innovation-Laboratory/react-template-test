import { convertToCapCase, isBlank, timeAgo } from "./helpers";

describe("Utility Method Tests :: Helpers", () => {

  describe("isBlank Tests", () => {

    test("An Empty String Is Correctly Identified", () => {
      const input = "";

      const result = isBlank(input);

      expect(result).toBeTruthy();
    });

    test("A Non-Empty String Does Not Give A False-Positive", () => {
      const input = "Non-blank string with spaces.";

      const result = isBlank(input);

      expect(result).toBeFalsy();
    });

    test("Non-Strings Are Considered Blank", () => {
      const input = { fizz: "" };

      const result = isBlank(input);

      expect(result).toBeTruthy();
    });
  });

  describe("timeAgo Tests", () => {

    test("Valid Epoch Times Generate Valid Outputs", () => {
      const time = 1645130756606;
      const timeAgoStr = timeAgo(time);

      expect(!isBlank(timeAgoStr)).toBeTruthy();
      expect(timeAgoStr).toBeDefined();
    });

    test("Invalid Inputs Generate Error Outputs", () => {
      const invalidTime = "I am not an epoch number";
      const timeAgoStr = timeAgo(invalidTime);

      expect(timeAgoStr).toEqual("NaN years ago");
    });
  });

  describe("convertToCapCase Tests", () => {

    test("An alllowercase Word Gets The First Letter Capitalized", () => {
      const word = "alllowercase";
      const convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("Alllowercase");
    });

    test("An ALLUPPERCASE Word Gets All But The First Letter Lower-Cased", () => {
      const word = "ALLUPPERCASE";
      const convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("Alluppercase");
    });

    test("A MiXeDcAsE Word Gets The Appropriate Letters Capitalized Or Lower-Cased", () => {
      const word = "MiXeDcAsE";
      const convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("Mixedcase");
    });

    test("A word-with-hyphens Gets The First Letter Capitalized", () => {
      const word = "word-with-hyphens";
      const convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("Word-with-hyphens");
    });

    test("A word_WITH_underScOres And Other Cases Elsewhere In The Word Gets Converted Correctly", () => {
      const word = "word_WITH_underScOres";
      const convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("Word_with_underscores");
    });

    test("An Invalid Input Returns An Empty String", () => {
      const word = undefined;
      let convertedWord = convertToCapCase(word);

      expect(convertedWord).toEqual("");

      const emptyWord = "";
      convertedWord = convertToCapCase(emptyWord);

      expect(convertedWord).toEqual("");
    });
  });

});
