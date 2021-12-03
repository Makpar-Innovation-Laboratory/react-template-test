import React, {useState} from "react";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function SignUpForm () {
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const data = { username: e.target[0].value, password: e.target[1].value, dev: e.target[3].value }
        console.log(data)
    }
    
    return (
    <div className='container w-25'>
        <div className="d-flex justify-content-center mt-5">
          <h3 className="color-primary" data-testid='title'>Sign Up</h3>
        </div>
        <div>
            <Form onSubmit={handleOnSubmit} data-testid='LoginForm'>
                <Form.Group className='mb-3' data-testid='formBasicEmail'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' name='username' data-testid='username' id='username'/>
                </Form.Group>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' name='password' data-testid='password'/>
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