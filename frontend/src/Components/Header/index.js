import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function index() {
  const auth = localStorage.getItem("user");

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Shopify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {auth ? (
              <div className="d-flex">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="categories">Categories</Nav.Link>
                <Nav.Link href="product">Product</Nav.Link>
                <Nav.Link href="orders">Orders</Nav.Link>
                <Nav.Link href="signout">Sign Out</Nav.Link>
              </div>
            ) : (
              <div className="d-flex">
                <Nav.Link href="signin">Sign In</Nav.Link>
                <Nav.Link href="signup">Sign Up</Nav.Link>
              </div>
            )}
          </Nav>

          {/* Search Bar */}
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default index;
