import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import MessageBox from "../components/MessageBox";
import { Helmet } from "react-helmet-async";

import {
  addToCart,
  decrement,
  deleteItem,
  calculateTotals,
} from "../redux/cartSlice"; // Import your cartSlice actions

const Cartscreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );

  const increment = async(product) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(calculateTotals());
  };

  const decrementHandler = (id) => {
    const item = cartItems.find((i) => i._id === id);
    if (item.quantity === 1) {
      dispatch(deleteItem(id));
    } else {
      dispatch(decrement(id));
    }
    dispatch(calculateTotals());
  };

  const deleteHandler = (id) => {
    dispatch(deleteItem(id));
    dispatch(calculateTotals());
  };
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div className="cart">
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>

      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => (
            <CartItem
              key={index}
              product={i}
              decrement={decrementHandler} // Use decrementHandler instead of decrement
              increment={increment} // Pass the whole product object
              deleteHandler={deleteHandler}
            />
          ))
        ) : (
          <div>
            <MessageBox variant="warning">
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          </div>
        )}
      </main>

      <aside>
        <h2>Subtotal: Rs.{subTotal}</h2>
        <h2>Shipping: Rs.{shipping}</h2>
        <h2>Tax: Rs.{tax}</h2>
        <h2>Total: Rs.{total}</h2>
        {/* <ListGroupItem>
          <div className="d-grid"> */}
        <Button
          type="button"
          variant="primary"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </Button>
        {/* </div> */}
        {/* </ListGroupItem> */}
      </aside>
    </div>
  );
};

const CartItem = ({ product, decrement, increment, deleteHandler }) => (
  <div className="cartItem">
    <img src={product.image} alt={product.name} />
    <article>
      <h3>{product.name}</h3>
      <p>Rs.{product.price}</p>
    </article>

    <div>
      <button onClick={() => decrement(product._id)}>-</button>
      <p>{product.quantity || 0}</p>
      <button onClick={() => increment(product)}>+</button>
    </div>
    <div>
      <AiFillDelete onClick={() => deleteHandler(product._id)} />
    </div>
  </div>
);

export default Cartscreen;
