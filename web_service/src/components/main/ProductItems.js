import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import InputNumber from "./InputNumber.js";
import "./card.css";
import Model from '../header/Modal.js';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {CartProvider} from "../Contex.js";
import {CartContext} from "../Contex.js";

function GridExample() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/product/');
      setData(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddToCart = (product) => {
    addToCart({ name: product.name, quantity: product.quantity, price: product.price, total: product.price*product.quantity });
    console.log('Produit ajouté au panier :', product);
    setShowModal(true); // Afficher le modal
    setSelectedProduct(product); // Définir le produit sélectionné
  };

  return (

    <div>
      {loading ? (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
      ) : error ? (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Erreur</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Erreur de connexion db survenu </p>
        </Modal.Body>
      </Modal.Dialog>
    </div>
      ) : (
        <Row xs={2} md={4} className="g-4">
          {data.map((item, idx) => (
            <Col key={idx}>
              <Card>
                <Card.Img variant="top" src={item.photo} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.price} $
                    <InputNumber product={item} onAcheter={handleAddToCart} />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}


export default GridExample;
