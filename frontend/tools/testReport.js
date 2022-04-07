import * as jest from "jest";

process.env.NODE_ENV = "test";

const args = [];
args.push("--reporters=\"default\"");
args.push("--reporters=\"jest-stare\"");

jest.run(args);
