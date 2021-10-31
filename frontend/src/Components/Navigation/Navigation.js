import React from 'react'
// import { Context } from "../../App";
import { Link, useLocation } from 'react-router-dom'

export default function Navigation () {
  const location = useLocation()

  return (
    <div className='nav-container background-light d-flex align-items-center py-4'>
      <div className='nav-header px-5'>
        <h1 className='color-primary'>MAKPAR</h1>
      </div>

      <div className='nav-items d-flex justify-content-start align-items-center'>
        <a>
          <div
            className='nav-item color-primary'
            id={location.pathname == '/' ? 'active' : ''}
          >
            <Link to='/' className='color-primary'>
              <h5 className='color-primary'>Home</h5>
            </Link>
          </div>
        </a>
      </div>

      <div className='px-5'>
        <a className=' color-primary'>
          <h5 className='color-primary'>Logout</h5>
        </a>
      </div>
    </div>

  )
}
