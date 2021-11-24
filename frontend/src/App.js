import React, { useState } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Utility/Auth";
export const Context = React.createContext();

export function Dashboard() {
  if (Auth.isUserAuthenticated()){ return <Home />}
  else { return <Navigate to="/Login"></Navigate> }
}

/**
 * @component
 *
 * @property {}
 *
 * @description
 * description goes here
 *
 * @returns {}
 */
export default function App() {
  const [page, setPage] = useState("Home");
  const [data, setData] = useState({results: []});
  const [isAuth, setIsAuth] = useState(false)

  /**
   * description goes here
   * @returns {boolean}
   */
  function checkAuth() {
    if (Auth.isUserAuthenticated()) { return true; }
    else { return false; }
  }

  /**
   * description goes here
   * @param {string} input
   */
  function updatePage(input) {
    setPage(input);
  }
  function updateData(inputs) {
    setData(inputs);
  }
  /**
   * description goes here
   * @returns {}
   */

  return (
    <Context.Provider
      value={{
        page: page,
        updatePage,
        data,
        updateData,
        isAuth: isAuth,
        setAuth: (bool) => setIsAuth(bool),
      }}
    >
      {/* <Router> */}
      <Navigation />
      <div className="App">
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      {/* </Router> */}
    </Context.Provider>
  );
}
