import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default function Login(props) {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("We submitted!");
    axios
      .post(
        "https://api-laborator-dev.makpar-innovation.com/token",
        {
          username: "gmoore@makpar.com",
          password: "Feynman22!",
        },{
            headers: {
              'content-type': 'application/json'
            }
          }
      )
      .then((res) => {
        console.log("Success: ", res.data);
      });
  };

  return (
    <div className="container w-25">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">just work</Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
