import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal"; 
import Button from "react-bootstrap/Button";
import "./ProductDetail.css";

const ProductDetail = ({products, addToCart}) => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const validImages = (product?.images || []).filter(Boolean);
  const [selectedImg, setSelectedImg] = useState(validImages[0] || "");
  
  const [showNotification, setShowNotification] = useState(false);
  const handleClose = () => setShowNotification(false);

  if (!product) return <h2>Producto no encontrado</h2>;

  const handleAddToCart = () => {
      addToCart(product);
      setShowNotification(true); 
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="product-detail-gallery">
          {selectedImg ? (
            <img
              className="product-main-img"
              src={selectedImg}
              alt={product.name}
            />
          ) : (
            <div className="no-images-msg">
              No se han encontrado imágenes de este producto
            </div>
          )}
          <div className="product-thumbnails">
            {validImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} miniatura ${idx + 1}`}
                className={`thumbnail-img${selectedImg === img ? " selected" : ""}`}
                onClick={() => setSelectedImg(img)}
                onError={e => e.target.style.display = 'none'}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-price">
            ${product.price.toLocaleString()}
          </div>
          <button 
              className="product-detail-btn"
              onClick={handleAddToCart}
          >
              Agregar al carrito
          </button>
        </div>
      </div>

      <Modal show={showNotification} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">✅ Agregado al Carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold">{product.name}</p> se ha añadido correctamente a tu carrito.
        </Modal.Body>
        <Modal.Footer>
          
          <Link to="/productos" onClick={handleClose}>
            <Button variant="secondary"> 
              Seguir comprando
            </Button>
          </Link>
          
          <Link to="/carrito">
            <Button variant="primary">
              Ir al Carrito
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductDetail;