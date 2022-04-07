import delay from "./delay";
import {
  sampleUsers,
  getRandomUser,
  getRandomClient,
  getRandomAdmin,
} from "./MockApiData";

class MockApi {

  //
  // Mock implementations of the REST calls in MainApi
  //

  static getCurrentUser(client=false, admin=false, specific=true, shouldFail=false) {
    // Use the above flags to get the specific user type you need
    return new Promise( (resolve, reject) => {
      setTimeout( () => {
        if (!shouldFail) {
          if (client) {
            resolve({ ...getRandomClient() });
          } else if (admin) {
            resolve({ ...getRandomAdmin() });
          } else if (specific) {
            // Pick your specific user here
            resolve({ ...sampleUsers[4] });
          } else {
            resolve({ ...getRandomUser() });
          }
        } else {
          reject("Test failure for unit testing purposes only -- getCurrentUser");
        }
      }, delay);
    });
  }
}

export default MockApi;
