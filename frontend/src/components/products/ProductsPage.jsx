import ProductCard from "./ProductCard";

const normalizeString = (str) => {
  if (!str) return '';  
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};

const ProductsPage = ({ products, loading, searchTerm }) => {

  if (loading) {
    return (
      <main className="products-loading">
        <h2>Cargando productos...</h2>
      </main>
    );
  }

  const normalizedSearchTerm = normalizeString(searchTerm);

  const filteredProducts = products.filter((p) =>
    normalizeString(p.name).includes(normalizedSearchTerm)
  );

  if (!filteredProducts.length) {
    return (
      <main className="products-empty">
        <h2>No se encontraron productos 😕</h2>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Nuestros Productos</h2>
      <div className="products-list">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ProductsPage;
