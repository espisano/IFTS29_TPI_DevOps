import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Benefits.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Benefits = () => {
  const benefitItems = [
    { 
      iconClass: 'bi bi-truck', 
      title: 'Entregas a todo el país',
      description: 'Garantizamos el envío seguro a cualquier punto.',
    },
    { 
      iconClass: 'bi bi-percent', 
      title: 'Descuento en efectivo',
      description: 'Aprovecha nuestro descuento exclusivo al pagar en efectivo.',
    },
    { 
      iconClass: 'bi bi-credit-card-2-front', 
      title: 'Cuotas sin intereses',
      description: 'Financia tus muebles en cómodas cuotas sin costo adicional.',
    },
  ];

  return (
    <Container className="benefits-container my-5">
      <Row className="g-5 py-4 text-center">
        {benefitItems.map((item, index) => (
          <Col key={index} xs={12} md={4}>
            <div className="benefit-item">
              <i className={`${item.iconClass} icon-benefit fs-1`}></i>
              
              <h3 className="benefit-title mt-3">{item.title}</h3>
              
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Benefits;