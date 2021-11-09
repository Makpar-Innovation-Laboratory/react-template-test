import React, {useContext} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Auth from '../../Utility/Auth'
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

export default function Login () {
  const navigate = useNavigate()
  const context = useContext(Context)
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
      <Form onSubmit={handleOnSubmit} >
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter Username' name='username' />
          <Form.Text className='text-muted'>just work</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='checkbox' label='Check me out' />
        </Form.Group>
        <Button variant='primary' type='submit' >
          Submit
        </Button>
      </Form>
    </div>
  )
}
