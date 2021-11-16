import React from "react";
import { mount } from "enzyme";
import { act } from 'react-dom/test-utils'
import "./enzymeConfig.js";
import Login from "./Login";
import { render, unmountComponentAtNode } from "react-dom";

let container = null
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and function', () => {
  // Test first render and componentDidMount
  act(() => {
    render(<Login />, container);
  });
  const button = container.querySelector("[data-testid='button']")
  const username = container.querySelector("[data-testid='username']")
  const email = container.querySelector("[data-testid='email']")
  expect(username.textContent).toBe("Password")
  expect(email.textContent).toBe("Enter Username")
  act(() => {
    button.dispatchEvent(new MouseEvent('click'));
  });
  
});
