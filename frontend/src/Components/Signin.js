import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    const auth=localStorage.getItem("user")
    if(auth){
      navigate("/")
    }
  },[])
  function signinuser(e){
    e.preventDefault()
    fetch("http://localhost:4101/api/signin",{
      method:"post",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({email,password})
    }).then((res1)=>{
      res1.json().then((res2)=>{
        console.log(res2)
        if(res2){
          localStorage.setItem("user",JSON.stringify(res2))
          navigate('/')
        }
      })
    })
  }
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form className="mt-5 text-start ms-5" onSubmit={signinuser}>
            <h1 className="mb-3 text-center">Sign In Form</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>{" "}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
