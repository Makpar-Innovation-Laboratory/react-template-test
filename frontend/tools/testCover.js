import * as jest from "jest";

process.env.NODE_ENV = "test";

const args = [];
args.push("--coverage");

jest.run(args);
