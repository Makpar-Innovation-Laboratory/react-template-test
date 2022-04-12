/* eslint-disable no-console */
/// <reference types="Cypress" />

/* global cy, Cypress */

/**
 * Helper to determine the URL of the test site to visit.
 *
 * Bases decision on various environment variables existing or not.
 */
export const getSiteUrl = () => {
  const rootUri = Cypress.env("STORK_INTERNAL_URL");
  const testKey = getTestOAuthKey();

  if (rootUri) {
    // Ensure the UI bundle files are also covered via Auth key
    // so our entry point can actually exist.
    interceptRoute("GET", "**/main.*", "init", testKey);

    return {
      url: `${rootUri}/`,
      headers: {
        Authorization: `Bearer ${testKey}`,
      }
    };
  } else {
    // For local UI dev testing outside of the Docker setup
    // (i.e. with Webpack's in-memory server)
    const tmplUrl = "http://localhost:3000/";
    return tmplUrl;
  }
};

/**
 * Helper method to pull the testing OAuth token contents
 * from the environment variable prepared by the pipeline
 * during automation runs.
 */
export const getTestOAuthKey = () => {
  /**
   * (Note: Yes, this is just a simple one-liner, but it exists
   * for easier refactoring down the line if we need to change *how*
   * this token is provided to Cypress tests.)
   */
  return Cypress.env("OAUTH_TEST_TOKEN");
};

/**
 * Helper method to contain the logic of setting up a cy.intercept() call
 * in addition to managing injecting authorization headers on outgoing calls.
 *
 * @param {string} method The HTTP method this route operates on (e.g. GET/POST)
 * @param {string} uri The path this route should be matched on (exact string or globs)
 * @param {string} alias The shorthand this route should be made available under for other Cypress methods
 * @param {string} testOAuthKey The key to be injected into the Authorization header (Default: "null")
 */
const interceptRoute = (method, uri, alias, testOAuthKey="null") => {
  cy.intercept(method, uri, (request) => {
    request.headers["Authorization"] = `Bearer ${testOAuthKey}`;
  }).as(alias);
};

/**
 * Helper method to configure Cypress to be aware of all the REST
 * end-points we're using so they can be appropriately waited on
 * for successful completion before executing tests.
 *
 * @see configurePartialRoutes Alternative method for when you do not need all routes monitored
 */
export const configureAllRoutes = () => {
  const rootApi = "**"; // Wild-card it for now
  const testKey = getTestOAuthKey();

  /**
   * Replace the below route interceptions with the appropriate REST routes
   * of the app you are implementing from this template.
   */
  interceptRoute("GET", rootApi + "/getConsultInfo/*", "getConsult", testKey);
  interceptRoute("POST", rootApi + "/getIdentifier*", "getId", testKey);
  interceptRoute("GET", rootApi + "/getDemographics/*", "getAddress", testKey);
  interceptRoute("POST", rootApi + "/getFacilities*", "getFacilities", testKey);
  interceptRoute("GET", rootApi + "/serviceList*", "getSvcs", testKey);
  interceptRoute("GET", rootApi + "/getSpecial/*", "getSpecial", testKey);
  interceptRoute("GET", rootApi + "/load/*", "loadRestore", testKey);
};

/**
 * Helper method to configure Cypress to be aware of specific REST
 * end-points needed in a given test so they can be appropriately
 * waited for to help avoid race-conditions in the test.
 *
 * This method differs from configureAllRoutes in that some tests will not
 * need nor invoke all the available REST endpoints and we do not want Cypress
 * waiting on calls that won't be made. Cypress will, in fact, fail the
 * test if the call is never made.
 *
 * @param {object} routeOptions A list of which routes to configure Cypress for
 * @example routeOptions: {
 *   getConsult: true,
 *   getId: true,
 *   getAddress: true,
 *   getFacility: true,
 *   getSvcs: true,
 *   getSpecial: true,
 *   getRestore: true,
 * }
 * @see configureAllRoutes Alternate option when you need all routes monitored
 */
export const configurePartialRoutes = ({
  getConsult,
  getId,
  getAddress,
  getFacility,
  getSvcs,
  getSpecial,
  getRestore,
}) => {
  const rootApi = "**"; // Wild-card it for now
  const testKey = getTestOAuthKey();

  /**
   * Replace the below route interceptions with the appropriate REST routes
   * of the app you are implementing from this template.
   */

  if (getConsult) interceptRoute("GET", rootApi + "/getConsultInfo/*", "getConsult", testKey);
  if (getId) interceptRoute("POST", rootApi + "/getIdentifier*", "getId", testKey);
  if (getAddress) interceptRoute("GET", rootApi + "/getDemographics/*", "getAddress", testKey);
  if (getFacility) interceptRoute("POST", rootApi + "/getFacilities*", "getFacilities", testKey);
  if (getSvcs) interceptRoute("GET", rootApi + "/serviceList*", "getSvcs", testKey);
  if (getSpecial) interceptRoute("GET", rootApi + "/getSpecial/*", "getSpecial", testKey);
  if (getRestore) interceptRoute("GET", rootApi + "/load/*", "loadRestore", testKey);
};

/**
 * Helper method that instructs Cypress to wait for the completion
 * of any pre-configured REST calls.
 *
 * @see configureAllRoutes - For which API calls are configured.
 */
export const waitForAPI = () => {
  cy.wait("@getConsult")
    .wait("@getId")
    .wait("@getAddress")
    .wait("@getFacilities")
    .wait("@getSvcs")
    .wait("@getSpecial")
    .wait("@loadRestore");
};

/**
 * Helper method to allow one to wait only on a specific REST call rather than
 * waiting on all calls.
 *
 * Most useful when used in conjunction with configurePartialRoutes
 *
 * @param {object} routeOptions A list of which routes to tell Cypress to wait on
 * @example routeOptions: {
 *   getConsult: true,
 *   getId: true,
 *   getAddress: true,
 *   getFacility: true,
 *   getSvcs: true,
 *   getSpecial: true,
 *   getRestore: true,
 * }
 * @see partialWaitForAPI Alternate option when you need all routes awaited
 */
export const partialWaitForAPI = ({
  getConsult,
  getId,
  getAddress,
  getFacility,
  getSvcs,
  getSpecial,
  getRestore,
}) => {
  if (getConsult) cy.wait("@getConsult");
  if (getId) cy.wait("@getId");
  if (getAddress) cy.wait("@getAddress");
  if (getFacility) cy.wait("@getFacilities");
  if (getSvcs) cy.wait("@getSvcs");
  if (getSpecial) cy.wait("@getSpecial");
  if (getRestore) cy.wait("@loadRestore");
};
