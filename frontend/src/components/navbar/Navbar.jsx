import Container from 'react-bootstrap/Container';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const MyNavbar = ({setSearchTerm, cartItems}) => {

  const navigate = useNavigate(); 
  const [font, setFont] = useState(false);
  const [currentSearchValue, setCurrentSearchValue] = useState('');

  const darkFont = () => font === false? setFont('fontHamburguer') : setFont(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCurrentSearchValue(value);
    setSearchTerm(value);
  };
  
  const handleSearchClick = () => {    
    navigate('/productos');
  };

  const totalItems = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <>
      <div className="topBar d-flex align-items-center justify-content-between px-4 py-2">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>

        <div className="searchBar d-flex align-items-center">
          <i 
            data-testid="search-icon"
            className="bi bi-search me-2" 
            onClick={handleSearchClick} 
            style={{ cursor: 'pointer' }}
          ></i>
          <input type="text" 
            placeholder="Buscar productos..." 
            value={currentSearchValue} 
            onChange={handleSearchChange}/>
        </div>

        <Link to="/carrito" className="cart d-flex align-items-center text-decoration-none text-dark position-relative">
          <span className="me-2">CARRITO</span>
          <i className="bi bi-cart4 fs-2"></i>
          {totalItems > 0 && (
            <span className="cart-badge badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
      <Navbar onToggle={darkFont} className='navBar sticky-top' expand="lg">
        <Container className={font}>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto btnNavBar d-flex gap-5">
              <Nav.Link className='me-5' href="/">Inicio</Nav.Link>
              <Nav.Link className='me-5' href="/quienes-somos">Quienes somos</Nav.Link>
              <Nav.Link className='me-5' href="/productos">Productos</Nav.Link>
              <Nav.Link className='me-5' href="/contacto">Contactanos</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar