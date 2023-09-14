import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setProducts, setLoading } from "../redux/productsSlice";
import Product from "../components/Product";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import Loader from "../components/Loader";
import MessageBox from "../components/MessageBox";

function HomeScreen() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.product.error);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true)); // Start loading
      try {
        const response = await axios.get("/api/products");
        dispatch(setProducts(response.data)); // Update products in Redux store
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false)); // Finish loading
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <main>
        <Helmet>
          <title>Ecommerce App</title>
        </Helmet>
        <h1>Featured Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </main>
    </div>
  );
}

export default HomeScreen;
