import Product from "../models/Products.js";

// Listar productos
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).send("Error fetching products");
  }
};

// Agregar producto con imágenes
export const addProduct = async (req, res) => {
  try {
    const imagePaths = req.files?.map((file) => file.path); // Cloudinary ya devuelve URLs

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      images: imagePaths || [],
    });

    const savedProduct = await newProduct.save();

    res.json({
      message: "✅ Producto guardado correctamente",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Error al agregar producto:", err);
    res.status(500).json({ message: "❌ Error al agregar producto" });
  }
};

// Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const imagePaths = req.files?.map((file) => file.path);
    const { name, price, description, stock } = req.body;

    const updatedData = {
      name,
      price,
      description,
      stock,
    };

    if (imagePaths?.length) {
      updatedData.images = imagePaths;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Product.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};
