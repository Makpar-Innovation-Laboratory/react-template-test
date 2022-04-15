//
// Mock data for local development and unit testing of the app & API
//

/**
 * A list of mock users
 */
export const sampleUsers = [{
  id: "fdbcbba6-11e0-453a-a2ab-6f2d815d5eef",
  name: "JohnDoe",
  roles: ["CLIENT"],
},{
  id: "aad544e4-e192-47d4-8808-338125ff254a",
  name: "JaneDoe",
  roles: ["CLIENT"],
},{
  id: "b06348ef-999a-40fc-89bc-4ee753169156",
  name: "SteveSmith",
  roles: ["CLIENT"],
},{
  id: "a1fddc9d-b465-4db1-ba08-ba2e1971e418",
  name: "NatashaJones",
  roles: ["CLIENT"],
},{
  id: "54583cfa-18d7-4652-bb75-641fbf63b440",
  name: "JeanSmith",
  roles: ["ADMIN"],
},{
  id: "9b664662-09e0-44bd-82ed-e8f2f221d1c2",
  name: "SusanGray",
  roles: ["ADMIN"],
}];

export const services = [
  { name: "Cybersecurity", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." },
  { name: "Machine Learning", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. Labore et dolore magna aliqua. Ut enim ad minim veniam. Sed do eiusmod tempor incididunt." },
  { name: "Cloud Migration", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
  { name: "DevSecOps", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
  { name: "Agile", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Sed do eiusmod tempor incididunt." },
];

export const blogs = [
  { title: "Lorem Ipsum Dolor Dit Amet 1", author: "John Doe", submitted: "02-12-2022", feature_image: "image_1" },
  { title: "Lorem Ipsum Dolor Dit Amet 2", author: "John Doe", submitted: "02-13-2022", feature_image: "image_1" },
  { title: "Lorem Ipsum Dolor Dit Amet 3", author: "John Doe", submitted: "02-14-2022", feature_image: "image_1" },
  { title: "Lorem Ipsum Dolor Dit Amet 4", author: "John Doe", submitted: "02-15-2022", feature_image: "image_1" },
  { title: "Lorem Ipsum Dolor Dit Amet 5", author: "John Doe", submitted: "02-15-2022", feature_image: "image_1" }
];



/**
 * @returns A mock user in the shape expected by the JSON Contract
 */
 export const getRandomUser = () => {
  const startRange = 0;
  const endRange = sampleUsers.length - 1;
  const randIdx = Math.floor(Math.random() * (endRange - startRange + 1) + startRange);

  return sampleUsers[randIdx];
};

/**
 * @returns A random user with the APPLICANT role
 */
export const getRandomClient = () => {
  let applicant = getRandomUser();

  while (applicant.roles.indexOf("CLIENT") < 0) {
    applicant = getRandomUser();
  }

  return applicant;
};

/**
 * @returns A random user with the ADJUDICATOR role
 */
export const getRandomAdmin = () => {
  let adjudicator = getRandomUser();

  while (adjudicator.roles.indexOf("ADMIN") < 0) {
    adjudicator = getRandomUser();
  }

  return adjudicator;
};

