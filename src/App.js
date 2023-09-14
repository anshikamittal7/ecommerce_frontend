import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Homescreen from "./screens/Homescreen";
import Productscreen from "./screens/Productscreen";

import "./styles/app.scss";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from "react-redux";

import { FiShoppingCart } from "react-icons/fi";
import Signinscreen from "./screens/Signinscreen";


function App() {
  const { cartItems } = useSelector(state => state.cart);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>ECOMMERCE</Navbar.Brand>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Navbar.Brand> <FiShoppingCart />
                  <p className="cartSize">{cartItems.length}</p></Navbar.Brand>

              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<Productscreen />} />
              <Route path="/cart" element={<Cartscreen />} />
              <Route path="/" element={<Homescreen />} />
              <Route path="/signin" element={<Signinscreen />} />
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
