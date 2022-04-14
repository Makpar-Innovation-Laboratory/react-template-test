/// <reference types="Cypress" />

/* global cy, */
/*
 * A Collection of generic actions that can be taken in the application.
 *
 * e.g. Interacting with UI elements, clicking a radio button, typing text
 * into an input field, clicking on a date-picker, etc.
 *
 * See each jsdoc comment for more information on what it does and how to use it.
 */
/**
 * This common action will find the specified element via the CSS selector given
 * on the page, validate it is visible, clear any existing text in the field,
 * then proceed to type the specified text as given in the method argument.
 *
 * @param {string} fieldSelector Any valid CSS selector of the element to find
 * @param {string} text The specific text to be entered into this field
 */
export const inputTextToField = (fieldSelector, text) => {
  cy.get(fieldSelector).should("be.visible")
    .clear()
    .type(text);
};

/**
 * This common action will find the dropdown container for CSS selector given,
 * validate it is visible, find the first entry that matches the item name
 * given in the method argument, and clicks that entry.
 *
 * @param {string} dropdownSelector Any valid CSS selector of the dropdown container element
 * @param {string} itemToSelect The name of the item in the dropdown to be selected
 */
export const selectDropdownItem = (dropdownSelector, itemToSelect) => {
  cy.get(dropdownSelector)
    .should("be.visible")
    .contains(itemToSelect)
    .get(dropdownSelector)
    .select(itemToSelect);
};

/**
 * A super simple and contrived example generic action for use in the Template
 * repository. Do not use something like this in a full automation of an
 * application test. You're better than this :)
 *
 * A simple helper to find a link on the page and click it.
 *
 * @param {string} linkToSelect The CSS selector of the link to be clicked
 */
export const clickLink = (linkToSelect) => {
  cy.get(linkToSelect)
    .should("be.visible")
    .click();
};
