import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
function Searchinput() {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:4205/api/search/${values.keyword}`).then(
      (resp1) => {
        resp1.json().then((resp2) => {
          setValues({ ...values, result: resp2 });
          navigate("/search");
        });
      }
    );
  }
  return (
    <div>
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <Button variant="outline-success">Search</Button>
      </Form>
    </div>
  );
}

export default Searchinput;
