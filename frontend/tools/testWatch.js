import * as jest from "jest";

process.env.NODE_ENV = "test";

const args = [];
args.push("--watchAll");

jest.run(args);
