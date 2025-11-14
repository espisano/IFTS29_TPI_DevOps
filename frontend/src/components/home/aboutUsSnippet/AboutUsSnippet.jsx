import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './AboutUsSnippet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutUsSnippet = () => {
  return (
    <Container className="about-us-snippet py-5 px-4 text-center">
      <h2 className="snippet-title mb-4">¡Diseños Únicos!</h2>

      <p className="snippet-text mx-auto mb-4">
        En Muebles del Valle nos destacamos por la creatividad al diseñar. Inspirados en
        la simpleza morfológica encontramos la sutileza que caracteriza a nuestros
        diseños, dando lugar al nacimiento de lo hermoso, lo bello del diseño...
        Esa es nuestra pasión y se refleja en cada producto nuevo que podemos
        ofrecerte.
      </p>

      <Button 
        variant="light" 
        className="btn-products" 
        href="/productos"
      >
        VER PRODUCTOS
      </Button>
    </Container>
  );
};

export default AboutUsSnippet;