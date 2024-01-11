import "./App.css";
import Header from "./Components/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Categories from "./Components/Categories";
import Products from "./Components/Products";

import Signout from "./Components/Signout";

import Footer from "./Components/Footer";
import Search from "./Components/Search";
import Userdashboard from "./user/Userdashboard";
import PrivateRoute from "./Routes/Private";
import Orders from "./user/Orders";
import Profile from "./user/Profile";
import AdminRoute from "./Routes/AdminRoute";
import Admindashboard from "./Admin/Admindashboard";
import Createcategory from "./Admin/Createcategory";
import Createproduct from "./Admin/Createproduct";
import Users from "./Admin/Users";
import Singleproduct from "./Components/Singleproduct";
import Cartpage from "./Components/Cartpage";
function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Userdashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Userdashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/Userdashboard" element={<AdminRoute />}>
            <Route path="Admin/Admindashboard" element={<Admindashboard />} />
            <Route path="Admin/create-category" element={<Createcategory />} />
            <Route path="Admin/create-product" element={<Createproduct />} />
            <Route path="Admin/users" element={<Users />} />
          </Route>
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Cartpage" element={<Cartpage />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Singleproduct/:slug" element={<Singleproduct />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signout" element={<Signout />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
