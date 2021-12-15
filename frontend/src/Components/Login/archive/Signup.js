import React, {useState} from "react";
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
function SignUpForm () {
    const navigate = useNavigate()
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const data = { email: e.target[0].value, username: e.target[1].value}
        console.log('submitted', data)
        axios
        .post('https://api-innolab-dev.makpar-innovation.net/register', data, {
            headers: {
            'content-type': 'application/json'
            }
        })
        .then((res) => {
            console.log('Success: ', res.data)
            navigate('/Login')
        })
    }
    
    return (
    <div className='container w-25'>
        <div className="d-flex justify-content-center mt-5">
          <h3 className="color-primary" data-testid='title'>Sign Up</h3>
        </div>
        <div>
            <Form onSubmit={handleOnSubmit} data-testid='LoginForm'>
                <Form.Group className='mb-3' data-testid='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' placeholder='Enter Email' name='email' data-testid='email' id='email'/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='username' name='username' data-testid='username'/>
                </Form.Group>
                <Form.Group>
                    <Form.Check 
                        type='checkbox'
                        name='developer-checkbox'
                    />
                </Form.Group>
                <Button variant='primary' type='submit' title="Login button" data-testid='button' id='button'>
                    Sign Up
                </Button>
            </Form>
            <a href="/Login" >Already Have an account?</a>
        </div>
    </div>
  );
};

export default SignUpForm;