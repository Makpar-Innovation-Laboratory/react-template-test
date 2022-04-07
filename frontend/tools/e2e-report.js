const { merge } = require("mochawesome-merge");
const htmlGenerator = require("mochawesome-report-generator");
const sourceDir = "./cypress/reports/*.json";
const outputDir = "./cypress/reports";
const mergeOptions = {
  files: [sourceDir],
};
const reportOptions = {
  reportDir: outputDir,
};

/**
 * Helper method intended to be run after automation tests have completed and
 * generated their individual Mochawesome JSON report files.
 *
 * Will merge the individual JSONs together and pass to the
 * Mochawesome-Report-Generator utility to create a HTML report for easy sharing
 * and display of the results.
 *
 * @see https://github.com/Antontelesh/mochawesome-merge#options
 *  For more information on the configuration options Mochawesome-Merge accepts
 * @see https://github.com/adamgruber/mochawesome-report-generator#options
 *  For more information on the configuration options Mochawesome-Report-Generator accepts
 */
const generateReport = async () => {
  const jsonReport = await merge(mergeOptions);
  await htmlGenerator.create(jsonReport, reportOptions);
  process.exit(jsonReport.stats.failures);
};

generateReport();
