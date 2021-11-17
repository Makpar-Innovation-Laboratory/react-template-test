import React from "react";
import App from './App'
import {MemoryRouter} from 'react-router-dom'
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

describe("<App />", () => {
    afterEach(cleanup);
    it('App function', () => {
      const component = render(<MemoryRouter><App /></MemoryRouter>)
      expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
      });
})