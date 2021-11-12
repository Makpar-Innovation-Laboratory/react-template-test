import React, { useState } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Utility/Auth";
export const Context = React.createContext();

// export function Dashboard() {
//   if (Auth.isUserAuthenticated()){ return <Home />}
//   else { return <Navigate to="/Login"></Navigate> }
// }

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
  const [data, setData] = useState({
    results: [
      {
        display_name: "John Doe",
        bio: "a cool dude",
        nationality: "spanish",
        display_date: "01/01/1980 - 01/01/2016",
        works: [
          {
            artist: "Alexander Calder",
            objectNumber: "AA25",
            artistId: 5616,
            medium: "steel",
            title: "Flamingo",
            creditLine:
              "Commissioned through the Art in Architecture Program\r\nFine Arts Collection\r\nU.S. General Services Administration",
            id: 23671,
            primaryImage:
              "/AA25\\Calder Flamingo photo Carol Highsmith 2007.jpg",
            classification: "sculpture",
            displayDate: "1974",
            region: "Region 5",
            dimensions: "53 x 60 x 24 ft. (1615.4 x 1828.7 x 731.5 cm)",
          },
          {
            artist: "Alexander Calder",
            objectNumber: "AA25",
            artistId: 5616,
            medium: "steel",
            title: "Flamingo",
            creditLine:
              "Commissioned through the Art in Architecture Program\r\nFine Arts Collection\r\nU.S. General Services Administration",
            id: 23672,
            primaryImage:
              "/AA25\\Calder Flamingo photo Carol Highsmith 2007.jpg",
            classification: "sculpture",
            displayDate: "1974",
            region: "Region 5",
            dimensions: "53 x 60 x 24 ft. (1615.4 x 1828.7 x 731.5 cm)",
          },
        ],
      },
    ],
  });
  // const [isAuth, setIsAuth] = useState(() => checkAuth())

  /**
   * description goes here
   * @returns {boolean}
   */
  // function checkAuth() {
  //   if (Auth.isUserAuthenticated()) { return true; }
  //   else { return false; }
  // }

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
        // isAuth: isAuth,
        setAuth: (bool) => setIsAuth(bool),
      }}
    >
      {/* <Router> */}
      <Navigation />
      <div className="App">
        <Routes>
          {/* <Route path='/Login' element={<Login/>}/> */}
          {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {/* </Router> */}
    </Context.Provider>
  );
}
