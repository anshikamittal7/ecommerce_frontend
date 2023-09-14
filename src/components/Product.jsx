import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import React from "react";

import { addToCart, calculateTotals } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";



const Product = ({ product }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const addToCartHandler = async() => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(calculateTotals());
    toast.success("Added to cart");
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>Rs.{product.price}</Card.Text>
        {product.countInStock > 0 ? (
          <Button
            variant="primary"
            onClick={() => {
              addToCartHandler({ product, quantity: 1 });
            }}
          >
            Add to cart
          </Button>
        ) : (
          <Button variant="secondary" disabled>
            Out of stock
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Product;
