import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import './Footer.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="main-footer mt-5 pt-4 pb-2"> 
      <Container>
        <Row className="align-items-center justify-content-between">
          
          <Col xs={12} md={6} className="text-center text-md-start mb-2 mb-md-0">
            <Nav as="ul" className="footer-social-links justify-content-center justify-content-md-start">
              <Nav.Item as="li">
                <Nav.Link href="*" target="_blank" className="p-2"><i className="bi bi-facebook fs-4"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="*" target="_blank" className="p-2"><i className="bi bi-instagram fs-4"></i></Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link href="*" target="_blank" className="p-2"><i className="bi bi-whatsapp fs-4"></i></Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xs={12} md={6} className="text-center text-md-end">
            <h4 className="footer-title m-0">MUEBLES DEL VALLE</h4>
            <p className="powered-by m-0 mt-1">POWERED BY CompuGlobalHyperMegaNet</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;