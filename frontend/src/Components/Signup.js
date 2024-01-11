import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

export default function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submituser(e) {
    e.preventDefault()
    fetch("http://localhost:4101/api/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    }).then((res1) => {
      res1.json().then((res2) => {
        console.log(res2);
      });
    });
  }
  return (
    <div>
      <Container>
        <Row>
          <Col md={6}>
            <Form className="mt-5 text-start ms-5" onSubmit={submituser}>
              <h1 className="mb-3 text-center">Sign Up </h1>
              <Row className="mb-3 ">
                <Col>
                  <Form.Control
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
