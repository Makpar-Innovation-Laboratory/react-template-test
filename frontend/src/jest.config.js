const config = {
    verbose: true,
    reporters: [
        "default",
          [ "jest-junit", { suiteName: "jest tests" } ]]
};
  
module.exports = config;
  