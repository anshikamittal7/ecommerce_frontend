import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import "./styles/app.scss";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { userSignout } from "./redux/userSlice";
import { signOut } from "./redux/cartSlice";

import { FiShoppingCart } from "react-icons/fi";
import Signinscreen from "./screens/Signinscreen";
import ShippingAddressScreen from "./screens/Shippingscreen";


function App() {
  const { cartItems } = useSelector(state => state.cart);
  const { userInfo } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(userSignout());
    dispatch(signOut());
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>ECOMMERCE</Navbar.Brand>
            </LinkContainer>

            <Nav className="ml-auto custom-nav">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FiShoppingCart />
                  <span className="cartSize">{cartItems.length}</span>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile" >
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={signoutHandler}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
              )}
            </Nav>
          </Container>
        </Navbar>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<Productscreen />} />
              <Route path="/cart" element={<Cartscreen />} />
              <Route path="/" element={<Homescreen />} />
              <Route path="/signin" element={<Signinscreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
