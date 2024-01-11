import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
function Categories() {
  const [categories, setCategories] = useState([]);
  const [parentId,setPatentId] = useState();
  const [name,setName] = useState();
  const [type,setType] = useState();

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

  // ADD Category Function
  function addcategory(){
    const cat = {parentId,name,type}
    console.log(cat)
    fetch("http://localhost:4101/api/category/create",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(cat)
    }).then((resp1)=>{
      resp1.json().then((resp2)=>{
        getcategories()
      })
    })
  }

  return (
    <div className="container mt-5">
      <ListGroup>
        {categories.map((item, index) => {
          return (
            <ListGroup.Item
              variant="primary"
              key={index}
              className="d-flex justify-content-between "
            >
              <span>{item.parentId}</span>
              <span className="ms-4">{item.name}</span>
              <span className="ms-4">{item.type}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <Form>
        <h1 className="mt-4">Add New Category</h1>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            ParentId
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="ParentId" value={parentId} onChange={(e)=>setPatentId(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Product Name:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Product Name" value={name} onChange={(e)=>setName(e.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Type:
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Type" value={type} onChange={(e)=>setType(e.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit" onClick={addcategory}>Add Category</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Categories;
