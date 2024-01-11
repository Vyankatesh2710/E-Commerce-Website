import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate,Link } from 'react-router-dom';
import Searchinput from './Searchinput';
import { useCart } from '../Context/Cart';
// import { useAuth } from '../context/auth'
function Header() {
    const [cart]=useCart()
    const auth=JSON.parse(localStorage.getItem("user"))
    console.log(auth)
  const navigate=useNavigate()
  const handleLogout = () => {
    // setAuth({
    //   ...auth,
    //   user: null,
    //   token: "",
    // });
    localStorage.removeItem("user");
    alert("Logout Successfully");
  };
  function navto()
  {
    console.log(auth.user.role)
    if(auth.user.role==="admin")
    {
      navigate('/Admindashboard')
    }
    else
    {
      navigate('/Userdashboard')
    }
  }
  return (
    <div>
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container fluid>
      <Navbar.Brand href="#">Online Shopping</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          
          <div className='d-flex'>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/Categories">Categories</Nav.Link>
          <Nav.Link href="/Products">Products</Nav.Link>
          <Searchinput/>
          {!localStorage.getItem("user")? (
              <>
                <li className="nav-item">
                  <Nav.Link href="/Signup" className="nav-link">
                    Signup
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/Signin" className="nav-link">
                    Signin
                  </Nav.Link>
                </li>
              </>
            ) : (
              <>
               
                    <li>
                     {auth.user.role==="admin"?<Nav.Link href='/Admindashboard'                      
                        className="dropdown-item"
                      >
                        Dashboard
                      </Nav.Link>:<Nav.Link href='/Userdashboard'                      
                        className="dropdown-item"
                      >
                        Dashboard
                      </Nav.Link>}
                      
                    </li>
                    <li>
                      <Nav.Link
                        onClick={handleLogout}
                        to="/Signout"
                        className="dropdown-item"
                      >
                        Signout
                      </Nav.Link>
                    </li>
                  {/* </ul>
                </li> */}
              </>
            )}
         
         <li className="nav-item">
              <Nav.Link href="/Cartpage" className="nav-link">
                Cart <sup>{cart?.length}</sup>
              </Nav.Link>
            </li>
          
         </div>
        </Nav>          
      </Navbar.Collapse>
    </Container>
  </Navbar>
  </div>
  )
}

export default Header