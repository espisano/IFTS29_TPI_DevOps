import { Router } from "express";
import multer from "multer";
import { storage } from "../config/cloudinary.js";
import {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";

const router = Router();
const upload = multer({ storage });

// Listar productos
router.get("/", listProducts);

// Agregar producto con imágenes a Cloudinary
router.post("/add", upload.array("images", 5), addProduct);

// Actualizar producto (opcional con nuevas imágenes)
router.put("/:id", upload.array("images", 5), updateProduct);

// Eliminar producto
router.delete("/:id", deleteProduct);

export const productRouter = router;
