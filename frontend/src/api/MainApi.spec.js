import moxios from "moxios";
import api, { instance } from "./MainApi";
import {
  sampleUsers,
} from "./MockApiData";

describe("API Testing :: Main API", () => {

  beforeEach(() => {
    moxios.install(instance);
  });

  afterEach(() => {
    moxios.uninstall(instance);
  });

  describe("Happy Path Tests", () => {

    test("getCurrentUser Returns A Valid User", async () => {
      const responseData = { ...sampleUsers[1] };
      const url = /userinfo/;

      moxios.stubOnce("GET", url, {
        status: 200,
        response: responseData,
      });

      const response = await api.getCurrentUser();

      expect(response).toBeDefined();
      expect(response.id).toEqual("aad544e4-e192-47d4-8808-338125ff254a");
      expect(response.name).toEqual("JaneDoe");
      expect(response.roles).toContain("CLIENT");
    });
  }) 
});
