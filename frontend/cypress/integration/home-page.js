/// <reference types="Cypress" />
import { getSiteUrl } from "../utils/apiHelpers";
import { clickLink } from "../common/generic-actions";
import { selectors } from "../common/selectors";

/* global cy, before */
describe("Feature: Main Skeleton App Home Page", () => {
  describe("Scenario: Home Page Contains Useful Information", () => {

    before("Get Skeleton App Home Page", () => {
      cy.visit(getSiteUrl());
    });

    it("Given I Open The Demo App To The Home Page", () => {
      cy.title().should("include", "ODOS III - Practice Project :: Form I-751");
    });

    it("When I Have Launched The Application And The Page Is Loaded", () => {
      cy.get(selectors.mainApp).should("be.visible");
      cy.get(selectors.notFoundPage).should("not.exist");
    });

    it("Then I See The Main Content Panel Of The Application", () => {
      cy.get(selectors.contentPanel).should("be.visible");
    });

    it("And I See The Navigation Buttons At The Top Of The Page", () => {
      cy.get(selectors.navPanel).should("be.visible");
      // cy.get(selectors.homeNavLink).should("be.visible");
      // cy.get(selectors.aboutNavLink).should("be.visible");
    });

    xit("And I Can Navigate To The About Page", () => {
      clickLink(selectors.aboutNavLink);

      cy.get(selectors.aboutPage)
        .should("be.visible");

      cy.get(selectors.aboutHeader)
        .should("contain.text", "About");
    });
  });

});
