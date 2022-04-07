/**
 * A special version of the MockApi hard coded to fail every call
 * to better aid unit testing of unhappy paths.
 */
/* istanbul ignore next */
class MockFailingApi {

  //
  // Mock implementations of the REST calls in MainApi
  //

  static getCurrentUser() {
    return new Promise( (resolve, reject) => {
      reject("Test failure for unit testing purposes only -- getCurrentUser");
    });
  }
}

export default MockFailingApi;
