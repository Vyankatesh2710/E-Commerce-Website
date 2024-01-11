import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getcategories() {
    fetch("http://localhost:4101/api/category/getCategory").then((resp1) => {
      resp1.json().then((resp2) => {
        console.log(resp2);
        setCategories(resp2.error);
        console.log(categories);
      });
    });
  }
  useEffect(() => {
    getcategories();
  }, []);

  //Show Products
  function getproduct() {
    fetch("http://localhost:4101/api/product/getProducts").then((resp1) => {
      resp1.json().then((resp2) => {
        console.log(resp2);
        setProducts(resp2.error);
        console.log(products);
      });
    });
  }
  useEffect(() => {
    getproduct();
  }, []);

  //Add Product
  function addproduct(e) {
    e.preventDefault();
    const prod = new FormData();
    prod.append("name", name);
    prod.append("description", description);
    prod.append("price", price);
    prod.append("quantity", quantity);
    prod.append("photo", photo);
    prod.append("category", category);

    fetch("http://localhost:4101/api/poduct/create", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prod),
    }).then((resp1) => {
      resp1.json().then((resp2) => {
        getproduct();
      });
    });
  }

  function handleProd(item) {
    handleShow();
    selectprod(item);
  }

  function selectprod(item) {
    console.log(item);
    setName(item.name);
    setPrice(item.price);
    setQuantity(item.quantity);
    setDescription(item.description);
  }

  //Edit Products
  function editprod(index) {
    const prod = { name, price, quantity, photo, description };
    fetch(`http://localhost:4101/api/poduct/create`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prod),
    }).then((resp1) => {
      resp1.json().then((resp2) => {
        getproduct();
      });
    });
  }

  return (
    <div className="container">
      <h1 className="mt-4">Add New Product</h1>
      <Form>
        <Form.Select
          aria-label="Default select example"
          showSearch
          className="mb-3"
          name={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((c) => {
            return (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            );
          })}
        </Form.Select>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Product Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Product Price:
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Product Name"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Quantity :
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Type"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Description :
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Product Pictures :
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="file"
              placeholder="Picture"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={addproduct}>
              Add Product
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((item, index) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  {item.description}
                  <h4> ₹ {item.price}</h4>
                </Card.Text>

                <Button variant="primary" onClick={() => handleProd(item)}>
                  Edit
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Product Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalPassword"
                      >
                        <Form.Label column sm={2}>
                          Product Name
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalPassword"
                      >
                        <Form.Label column sm={2}>
                          Product Price
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            placeholder="Product Name"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label column sm={2}>
                          Quantity :
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            placeholder="Type"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formHorizontalEmail"
                      >
                        <Form.Label column sm={2}>
                          Description :
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Col>
                      </Form.Group>

                      <Form.Group controlId="formfile" className="mb-3">
                        <Form.Label>Upload Product Pictures :</Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                        </Col>
                      </Form.Group>
                      <div className="mb-3">
                        {photo && (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product image"
                              height={"200px"}
                              className="img-fluid"
                            />
                          </div>
                        )}
                      </div>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="primary" onClick={() => editprod()}>
                      Save Changes
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
