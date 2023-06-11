import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function InputNumber(props) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleAcheter = () => {
    const { name, price } = props.product; // Récupérer les informations du produit
    const quantity = parseInt(value); // Convertir la valeur en nombre entier
    const total = price * quantity; // Calculer le total

    // Appeler la fonction de rappel avec les informations de l'achat
    props.onAcheter({ name, quantity, price, total });
  };
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          type="number"
          value={value}
          onChange={handleChange}
          aria-label="number of product"
          min="0"
          aria-describedby="basic-addon1"
        />
        <Button variant="outline-secondary" onClick={handleAcheter}>
          Acheter
        </Button>
      </InputGroup>
    </>
  );
}
export default InputNumber;