import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

export default function Login (props) {
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
        console.log('Success: ', res.data)
      })
  }

  return (
    <div className='container w-25'>
      <Form onSubmit={handleOnSubmit}>
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
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}
