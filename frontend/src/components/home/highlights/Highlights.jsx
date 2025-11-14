import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Highlights.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importa las imágenes
import FotoNovedades from "../../../assets/Foto1.jpg";
import FotoLocalCABA from "../../../assets/Foto2.jpg";
import FotoLocalTucuman from "../../../assets/Foto3.jpg";

const Highlights = () => {
  const items = [
    { title: 'NOVEDADES', image: FotoNovedades },
    { title: 'LOCAL CABA', image: FotoLocalCABA },
    { title: 'LOCAL TUCUMÁN', image: FotoLocalTucuman },
  ];

  return (
    <Container className="highlights-container px-4">
      <Row className="g-4">
        {items.map((item, index) => (
          <Col key={index} xs={12} md={4}>
            <div className="highlight-card">
              <h2 className="card-title">{item.title}</h2>
              
              <div className="card-image-container">
                <img 
                  src={item.image} 
                  alt={`Imagen de ${item.title}`} 
                  className="card-image"
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Highlights;