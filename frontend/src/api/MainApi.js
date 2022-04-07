import axios from "axios";
// import queryString from "qs";

export const instance = axios.create({
  baseURL: "/api",
});

class MainApi {

  //
  // Static methods for managing Axios REST calls go here
  //

  static getCurrentUser() {
    return new Promise( (resolve, reject) => {
      instance.get("/userinfo")
        .then( (response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject("[ERROR] Empty 200 response from API when requesting user information!");
          }
        })
        .catch( (error) => {
          reject(error);
        });
    });
  }
}

export default MainApi;
