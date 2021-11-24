import React, {useContext} from 'react'
// import { Context } from "../../App";
import { Link, useLocation } from 'react-router-dom'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

/**
 * @component
 * 
 * @description description goes here
 * @returns {}
 */
export default function Navigation () {
  const context = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()

  /**
   * @description description goes here
   * @param {*} e - explanation of variable e goes here
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('test')
    Auth.deauthenticateUser()
    context.setAuth(false)
    navigate('/Login')
  }

  return (
    <div className='nav-container bg-white d-flex align-items-center py-4'>
      <div className='nav-header px-5'>
        <h1 className='color-primary'>MAKPAR</h1>
      </div>

      <div className='nav-items d-flex justify-content-start align-items-center'>
        {/* <a> */}
          <div
            className='nav-item color-primary'
            id={location.pathname === '/' ? 'active' : ''}
          >
            <Link to='/' className='color-primary'>
              <h5 className='color-primary' id="Home-Button">Home</h5>
            </Link>
          </div>
        {/* </a> */}
      </div>

      <div className='px-5'>
        <a className=' color-primary'>
          <button className="btn color-primary" type="submit" onClick={handleSubmit} >Logout</button>
        </a>
      </div>
    </div>

  )
}
