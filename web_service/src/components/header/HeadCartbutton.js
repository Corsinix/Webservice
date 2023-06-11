import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Model from './Modal';
import { useState, useContext } from 'react';
import { CartContext } from '../Contex';


function Badgeeee() {
  const { cartItems } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  if (cartItems.lenght =! 0) {
    const initialvalue = 0;
    
    var Totalbadge = cartItems.reduce((total, value)=> total + parseInt(value.quantity), initialvalue);
  }
  else {
    Totalbadge = 0
  }
  console.log(cartItems);
  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        Panier <Badge bg="secondary">{ Totalbadge }</Badge>
        <span className="visually-hidden">unread messages</span>
      </Button>
      <Model show={showModal} handleCloseModal={handleCloseModal} handleShow={handleShowModal} />
    </>
  );
}
export default Badgeeee;