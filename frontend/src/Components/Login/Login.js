import React, {useContext} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

/**
 * @component
 * @description
 * description goes here
 * @returns {}
 */
export default function Login () {
  const navigate = useNavigate()
  const context = useContext(Context)

  /**
   * @description
   * 
   * @param {*} e 
   */
  const handleOnSubmit = (e) => {
    e.preventDefault()

    const data = { username: e.target[0].value, password: e.target[1].value }
    console.log('We submitted! : ')
    axios
      .post('https://api-laboratory-dev.makpar-innovation.com/token', data, {
        headers: {
          'content-type': 'application/json'
        }
      })
      .then((res) => {
        // console.log('Success: ', res.data)
        Auth.authenticateUser(res.data.AuthenticationResult.IdToken)
        context.setAuth(true)
        navigate('/')
      })
  }
  
  return (
    <div className='container w-25'>
      <div className="d-flex justify-content-center mt-5">
        <h3 className="color-primary">Login</h3>
      </div>
      <Form onSubmit={handleOnSubmit} >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' name='username' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' />
        </Form.Group>
        <Button variant='primary' type='submit' title="Login button">
          Login
        </Button>
      </Form>
    </div>
  )
}
