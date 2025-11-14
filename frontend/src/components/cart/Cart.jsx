import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; 
import './cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const EMAILJS_SERVICE_ID = 'service_xhegdmm'; 
const EMAILJS_TEMPLATE_ID = 'template_4xdymqc'; 
const EMAILJS_PUBLIC_KEY = 'SActIF6YHXjKQTXrT'; 

const Cart = ({ cartItems, removeCartItem, updateQuantity, emptyCart }) => {
  
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showModal, setShowModal] = useState(false); 
  const [buyerInfo, setBuyerInfo] = useState({ email: '', phone: '' });
  const [alertModal, setAlertModal] = useState({ show: false, title: '', body: '', variant: '' }); 

  const handleCloseAlert = () => setAlertModal({ ...alertModal, show: false });
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; 
  const total = subtotal - discount + shipping;

  const handleCouponChange = (event) => { setCouponCode(event.target.value.toUpperCase()); };
  
  const applyCoupon = () => {
    if (couponCode === 'WEDDING') {
      const discountAmount = subtotal * 0.10;
      setDiscount(discountAmount);
      setAlertModal({
        show: true, 
        title: '✅ Cupón Aplicado', 
        body: `¡Cupón **WEDDING** aplicado con éxito! Descuento de $${discountAmount.toLocaleString('es-AR')}.`,
        variant: 'success'
      });
    } else {
      setDiscount(0);
      setAlertModal({
        show: true, 
        title: '❌ Error de Cupón', 
        body: 'Código de cupón inválido o no aplicable.',
        variant: 'danger'
      });
    }
  };

  const handleQuantityChange = (event, productId) => {
    const newQuantity = event.target.value;
    updateQuantity(productId, newQuantity);
    
    if (newQuantity < 1) {
       setAlertModal({
        show: true, 
        title: '⚠️ Producto Eliminado', 
        body: 'La cantidad no puede ser menor a 1, el producto ha sido eliminado del carrito.',
        variant: 'warning'
      });
    }
  };
  
  const calculateShipping = () => {
    setAlertModal({
      show: true, 
      title: ' Cálculo de Envío', 
      body: 'La función para calcular el costo de envío está pendiente de implementación con el Backend.',
      variant: 'info'
    });
  };

  const handleBuyerInfoChange = (e) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const processOrder = async (e) => {
    e.preventDefault(); 
    handleClose(); 
    
    const orders = cartItems.map(item => ({
        item: item.name, 
        price: (item.price * item.quantity).toLocaleString('es-AR'), 
        units: item.quantity,
    }));

    const templateParams = {
        buyer_email: buyerInfo.email, 
        buyer_phone: buyerInfo.phone, 
        orders: orders, 
        sub_total: subtotal.toLocaleString('es-AR'), 
        discount_amount: discount > 0 ? discount.toLocaleString('es-AR') : null, 
        'cost.shipping': shipping.toLocaleString('es-AR'),
        'cost.tax': '0.00', 
        'order_id': 'AUTO-' + Math.floor(Math.random() * 90000) + 10000, 
        'order_total': total.toLocaleString('es-AR'), 
    };

    try {
        const result = await emailjs.send(
            EMAILJS_SERVICE_ID, 
            EMAILJS_TEMPLATE_ID, 
            templateParams, 
            EMAILJS_PUBLIC_KEY
        );

        if (result.status === 200) {
            setAlertModal({
                show: true,
                title: '🎉 Pedido Confirmado',
                body: '¡Su pedido ha sido registrado con éxito! Recibirá un email de confirmación. Redireccionando al Home...',
                variant: 'success'
            });
            
            setTimeout(() => {
                emptyCart(); 
                navigate('/');
            }, 5000); 

        } else {
            throw new Error(`Error en el servicio de EmailJS. Código de respuesta: ${result.status}`);
        }
    } catch (error) {
        console.error("Error al enviar el pedido por EmailJS:", error);
        setAlertModal({
            show: true,
            title: '❌ Error de Envío',
            body: `Hubo un problema al registrar su pedido. Por favor, revise la consola para más detalles.`,
            variant: 'danger'
        });
    }
  };


  if (cartItems.length === 0) {
    return (
      <Container className="cart-page-container my-5 text-center">
        <h1 className="cart-page-title mb-3">Tu Carrito está Vacío 😔</h1>
        <p>Parece que aún no has agregado ningún producto.</p>
        <Link to="/productos" className="btn btn-primary-action mt-3">
            Explorar Productos
        </Link>
      </Container>
    );
  }

  return (
    <>
      <Container className="cart-page-container my-5">
        <h1 className="cart-page-title text-center mb-5">Carrito</h1>

        <Row>
          <Col xs={12} md={8} className="cart-items-section pe-md-4">
            <h2 className="company-name mb-4">MUEBLES DEL VALLE</h2>

            <Row className="cart-header py-2 d-none d-md-flex text-muted fw-bold border-bottom">
              <Col md={6}>PRODUCTO</Col>
              <Col md={2} className="text-center">PRECIO</Col>
              <Col md={2} className="text-center">CANTIDAD</Col>
              <Col md={2} className="text-end">SUBTOTAL</Col>
            </Row>

            {cartItems.map(product => (
              <Row key={product._id} className="cart-item-row py-3 align-items-center border-bottom">
                  <Col xs={1} className="text-center">
                      <i 
                          className="bi bi-x-circle item-remove-icon"
                          onClick={() => removeCartItem(product._id)}
                          style={{ cursor: 'pointer' }}
                      ></i>
                  </Col>
                  
                  <Col xs={11} md={5} className="d-flex align-items-center">
                      <img src={product.images?.[0]} alt={product.name} className="item-image me-3" />
                      <span className="item-name">{product.name}</span>
                  </Col>
                  
                  <Col xs={4} md={2} className="text-center cart-data">
                      <span className="d-md-none fw-bold">PRECIO: </span>
                      ${product.price.toLocaleString('es-AR')}
                  </Col>
                  
                  <Col xs={4} md={2} className="text-center cart-data">
                      <span className="d-md-none fw-bold">CANTIDAD: </span>
                      <Form.Control 
                          type="number" 
                          value={product.quantity} 
                          min="1"
                          onChange={(e) => handleQuantityChange(e, product._id)}
                          className="quantity-input mx-auto"
                      />
                  </Col>
                  
                  <Col xs={4} md={2} className="text-end cart-data">
                      <span className="d-md-none fw-bold">SUBTOTAL: </span>
                      ${(product.price * product.quantity).toLocaleString('es-AR')}
                  </Col>
              </Row>
            ))}


            <div className="cart-actions mt-4 d-flex justify-content-start">
              <Link to="/productos" className="btn btn-light btn-secondary-action me-2">
                ← Seguir comprando
              </Link>
            </div>
          </Col>

          <Col xs={12} md={4} className="cart-totals-section ps-md-4 mt-5 mt-md-0">
            <h3 className="totals-title mb-3">TOTALES DEL CARRITO</h3>
            
            <div className="totals-box p-3">
              <Row className="total-row mb-2">
                <Col xs={6}>Subtotal</Col>
                <Col xs={6} className="text-end">${subtotal.toLocaleString('es-AR')}</Col>
              </Row>

              {discount > 0 && (
                  <Row className="total-row mb-2 text-success fw-bold">
                      <Col xs={6}>Descuento (10%)</Col>
                      <Col xs={6} className="text-end">-${discount.toLocaleString('es-AR')}</Col>
                  </Row>
              )}
              
              <Row className="total-row mb-3 border-bottom pb-3">
                <Col xs={6}>Envío</Col>
                <Col xs={6} className="text-end">
                  {shipping > 0 ? `$${shipping.toLocaleString('es-AR')}` : 
                  <a href="#shipping" onClick={calculateShipping} className="shipping-link">Calcular envío</a>}
                </Col>
              </Row>

              <Row className="total-row total-grand fw-bold mb-4">
                <Col xs={6}>Total</Col>
                <Col xs={6} className="text-end">${total.toLocaleString('es-AR')}</Col>
              </Row>

              <Button 
                  variant="primary" 
                  className="w-100 mb-4" 
                  onClick={handleShow}
              >
                Iniciar compra
              </Button>

              <h5 className="coupon-title">Cupón</h5>
              <Form.Group controlId="couponCode" className="d-flex">
                <Form.Control 
                  type="text" 
                  placeholder="Código de cupón" 
                  className="coupon-input me-2" 
                  value={couponCode}
                  onChange={handleCouponChange}
                />
                <Button 
                  variant="light" 
                  className="btn-coupon-apply"
                  onClick={applyCoupon}
                >
                  Aplicar cupón
                </Button>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Container>


      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Finalizar Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ingrese sus datos para que un asesor pueda coordinar su pedido.</p>
          <Form onSubmit={processOrder}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                name="email"
                value={buyerInfo.email}
                onChange={handleBuyerInfoChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Ej: 1123456789"
                name="phone"
                value={buyerInfo.phone}
                onChange={handleBuyerInfoChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Confirmar Pedido
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={alertModal.show} onHide={handleCloseAlert} centered>
        <Modal.Header closeButton>
          <Modal.Title className={alertModal.variant === 'success' ? 'text-success' : alertModal.variant === 'danger' ? 'text-danger' : alertModal.variant === 'warning' ? 'text-warning' : 'text-info'}>
            {alertModal.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertModal.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAlert}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cart;