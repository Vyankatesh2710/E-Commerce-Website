import React from "react";
import { useSearch } from "../context/search";
import Card from "react-bootstrap/Card";
function Search() {
  const [values, setValues] = useSearch();
  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>
          {values?.result.length < 1
            ? "No results found"
            : `Found ${values?.result.length}`}
        </h6>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {values?.result.map((item, index) => {
            return (
              <div className="col">
                <Card style={{ width: "18rem" }} key={index}>
                  <Card.Img
                    variant="top"
                    className="w-100 mx-auto d-block"
                    src={`http://localhost:4205/api/product/getphoto/${item._id}`}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description}

                      <h4>₹ {item.price}</h4>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
