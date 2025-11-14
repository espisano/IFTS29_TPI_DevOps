import { useState } from "react";
import axios from "axios";
import "./addProduct.css";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("price", form.price);
    data.append("description", form.description);
    data.append("stock", form.stock);

    for (let i = 0; i < form.images.length; i++) {
      data.append("images", form.images[i]);
    }

    try {
      await axios.post("https://ifts29-tpfinal-backend.onrender.com/products/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Producto agregado correctamente");
      setForm({
        name: "",
        price: "",
        description: "",
        stock: "",
        images: [],
      });
    } catch (error) {
      alert("❌ Error al agregar el producto");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addproduct-container">
      <h2>Agregar nuevo producto</h2>
      <form onSubmit={handleSubmit} className="addproduct-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre del producto"
            required
          />
        </div>

        <div className="form-group">
          <label>Precio:</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Ingrese el precio"
            required
          />
        </div>

        <div className="form-group">
          <label>Stock:</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Ingrese el stock inicial"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ingrese la descripción del producto"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Imágenes:</label>
          <input type="file" multiple onChange={handleImageChange} />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Agregar producto"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
