import React, {useContext} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

/**
 * @component
 * @description description goes here
 * @returns {}
 */
export default function Login () {
  const navigate = useNavigate()
  const context = useContext(Context)

  /**
   * @description function for handling API authentication 
   * 
   * @param {*} e  - form submission containing username/password combo for authentication
   */
  const handleOnSubmit = (e) => {
    e.preventDefault()
    
    const data = { username: e.target[0].value, password: e.target[1].value, dev: e.target[3].value }
    console.log(data)
    console.log('We submitted! : ')
    axios
      .post('https://api-innolab-dev.makpar-innovation.net/token', data, {
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
        <h3 className="color-primary" data-testid='title'>Login</h3>
      </div>
      <Form onSubmit={handleOnSubmit} data-testid='LoginForm'>
        <Form.Group className='mb-3' data-testid='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' name='username' data-testid='username' id='username'/>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' data-testid='password'/>
        </Form.Group>

        <Form.Check 
          type='checkbox'
          name='developer-checkbox'
        />

        <Button variant='primary' type='submit' title="Login button" data-testid='button' id='button'>
          Login
        </Button>
        <a href="/Signup" >Don't have an account?</a>
      </Form>
    </div>
  )
}
