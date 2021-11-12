import React, { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation/Navigation'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './Utility/Auth'
export const Context = React.createContext()

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
export default function App () {
  const [page, setPage] = useState('Home')
  const [data, setData] = useState({"artist": {
        "bio": "Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[8][9] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by German and Italian air forces during the Spanish Civil War.",
        "nationality": "spanish",
        "birth_death_date": "25 October 1881 – 8 April 1973",
        "works": [
            {
                "title": "something old",
                "classification": "something borrowed",
                "display_date":"25 September 1887",
                "medium": "oil",
                "dimensions": "22x5"
            },
            {
                "title": "double double",
                "credit": "toil and trouble",
                "classification": "something wicked",
                "dimensions": "this way comes"
            }
      ],},"John Doe": {
        "bio": "Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[8][9] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by German and Italian air forces during the Spanish Civil War.",
        "nationality": "spanish",
        "birth_death_date": "25 October 1881 – 8 April 1973",
        "works": [
            {
                "title": "something old",
                "classification": "something borrowed",
                "display_date":"25 September 1887",
                "medium": "oil",
                "dimensions": "22x5"
            },
            {
                "title": "double double",
                "credit": "toil and trouble",
                "classification": "something wicked",
                "dimensions": "this way comes"
            }
          ]},"John Doe":{
            "bio": "Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France. Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[8][9] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by German and Italian air forces during the Spanish Civil War.",
            "nationality": "spanish",
            "birth_death_date": "25 October 1881 – 8 April 1973",
            "works": [
                {
                    "title": "something old",
                    "classification": "something borrowed",
                    "display_date":"25 September 1887",
                    "medium": "oil",
                    "dimensions": "22x5"
                },
                {
                    "title": "double double",
                    "credit": "toil and trouble",
                    "classification": "something wicked",
                    "dimensions": "this way comes"
                }
              ]},
  })
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
  function updatePage (input) {
    setPage(input)
  }
  function updateData(inputs) {
    setData(inputs)
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
          data: data,
          updateData,
          // isAuth: isAuth,
          setAuth: (bool) => setIsAuth(bool),
        }}
      >
        {/* <Router> */}
          <Navigation />
          <div className='App'>
            <Routes>
              {/* <Route path='/Login' element={<Login/>}/> */}
              {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
              <Route path='/' element={<Home />} />
            </Routes>
          </div>
        {/* </Router> */}
      </Context.Provider>
    )
}


