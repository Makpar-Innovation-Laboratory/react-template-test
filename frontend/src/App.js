import React, { useState } from 'react'
import './App.css'

import Navigation from './Components/Navigation/Navigation'
import Home from './Components/Home/Home'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export const Context = React.createContext()

function App () {
  const [page, setPage] = useState('Home')
  function updatePage (input) {
    setPage(input)
  }

  return (
    <Context.Provider
      value={{
        page, updatePage
      }}
    >
      <Router>
        <div className='App'>
          <Switch>
            <Route path='/'>
              <div className='main-wrapper d-flex'>
                <Navigation />
                <Home />
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  )
}

export default App
