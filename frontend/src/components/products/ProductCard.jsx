import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => (
    <Link to={`/productos/${product._id}`} className="product-card-link">
        <div className="product-card">
            <img 
                src={product.images[0] || '/placeholder.jpg'} 
                alt={product.name} 
                className="product-card-img"
            />
            <h3>{product.name}</h3>
            <strong className="product-price">
                ${product.price.toLocaleString()}
            </strong>
        </div>
    </Link>
);

export default ProductCard;