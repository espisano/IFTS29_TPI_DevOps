import { useState, useEffect } from "react";
import axios from "axios";
import "./updateStock.css";

const UpdateStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [edits, setEdits] = useState({});

  const backendURL = "https://ifts29-tpfinal-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${backendURL}/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (id, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdate = async (id) => {
    const productEdit = edits[id];
    if (!productEdit) {
      setMessage("⚠️ No hay cambios para guardar");
      return;
    }

    setMessage("Actualizando...");

    try {
      const res = await axios.put(`${backendURL}/products/${id}`, {
        stock:
          productEdit.stock !== undefined
            ? parseInt(productEdit.stock)
            : undefined,
        price:
          productEdit.price !== undefined
            ? parseFloat(productEdit.price)
            : undefined,
      });

      if (res.status === 200) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === id
              ? {
                  ...p,
                  stock:
                    productEdit.stock !== undefined
                      ? parseInt(productEdit.stock)
                      : p.stock,
                  price:
                    productEdit.price !== undefined
                      ? parseFloat(productEdit.price)
                      : p.price,
                }
              : p
          )
        );
        setEdits((prev) => ({ ...prev, [id]: {} }));
        setMessage("✅ Producto actualizado correctamente");
      } else {
        setMessage("❌ Error al actualizar el producto");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al conectar con el servidor");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;

    setMessage("Eliminando producto...");

    try {
      const res = await axios.delete(`${backendURL}/products/${id}`);
      if (res.status === 200) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        setMessage("🗑️ Producto eliminado correctamente");
      } else {
        setMessage("❌ No se pudo eliminar el producto");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error al eliminar el producto");
    }
  };

  if (loading) return <main><h2>Cargando productos...</h2></main>;

  return (
    <main className="update-stock-container">
      <div className="update-stock-header">
        <h2>Administrar productos</h2>
        <button className="btn-add" onClick={() => window.open("/admin/add", "_blank")}>
          ➕ Agregar nuevo producto
        </button>
      </div>
      {message && <p className="update-stock-message">{message}</p>}

      <table className="update-stock-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Guardar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={
                    edits[product._id]?.price ?? product.price ?? ""
                  }
                  onChange={(e) =>
                    handleInputChange(product._id, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={
                    edits[product._id]?.stock ?? product.stock ?? ""
                  }
                  onChange={(e) =>
                    handleInputChange(product._id, "stock", e.target.value)
                  }
                />
              </td>
              <td>
                <button
                  className="btn-update"
                  onClick={() => handleUpdate(product._id)}
                >
                  Guardar
                </button>
              </td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product._id)}
                >
                  🗑️ Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default UpdateStock;
