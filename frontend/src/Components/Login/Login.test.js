import React from "react";
import {jest} from '@jest/globals'
import "./enzymeConfig.js";
import Login from "./Login";
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom'

import {cleanup, fireEvent, render, screen} from '@testing-library/react';
// import { act } from 'react-dom/test-utils'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
// import { createTheme } from "@material-ui/core";

describe("<Login />", () => {
  afterEach(cleanup);
  it('Login Renders', () => {
    const component = renderer.create(
      <MemoryRouter>
        <Login/>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

  });
  it('Button handles click', () => {
    // const component = renderer.create(
    //   <MemoryRouter>
    //     <Login/>
    //   </MemoryRouter>
    // );
    const component = render(<MemoryRouter><Login username='hello' /></MemoryRouter>)
    let button = screen.getByTestId('button')
    let username = screen.getByTestId('username')
    let password = screen.getByTestId('password')
    // fireEvent.click(button)
    fireEvent.change(username, { target: { value: "test" } });
    fireEvent.change(password, { target: { value: "test" } });
    expect(username.value).toBe('test')
    expect(password.value).toBe('test')
    // expect(onSubmit).toHaveBeenCalled()
    // let button = instance.findByType('button')
    
  });
});