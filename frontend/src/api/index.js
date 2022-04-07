import MockApi from "./MockApi";
import LiveApi from "./MainApi";

export default (process.env.NODE_ENV && process.env.NODE_ENV !== "production")
  ? MockApi
  : LiveApi;
