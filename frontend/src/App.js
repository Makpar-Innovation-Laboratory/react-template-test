import React, { useState } from 'react'
import './App.css'
import Navigation from './Components/Navigation/Navigation'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import { Routes, Route, Redirect } from 'react-router-dom'
import Auth from './Utility/Auth'

export const Context = React.createContext()

export default function App () {
  const [page, setPage] = useState('Home')
  const [isAuth, setIsAuth] = useState(() => checkAuth())
  function checkAuth() {
    if (Auth.isUserAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
  function updatePage (input) {
    setPage(input)
  }
  function Dashboard() {
    if (isAuth != true){
        return <Redirect to="/Login" />
    } else {
      return <Home />
    }
  }
  return (
      <Context.Provider
        value={{
          page: page, 
          updatePage,
          isAuth: isAuth,
          setAuth: (bool) => setIsAuth(bool),
        }}
      >
        {/* <Router> */}
          <Navigation />
          <div className='App'>
            <Routes>
              <Route path='/Login' element={<Login/>}/>
              {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
              <Route path='/' element={<Dashboard/>} />
            </Routes>
          </div>
        {/* </Router> */}
      </Context.Provider>
    )
}


