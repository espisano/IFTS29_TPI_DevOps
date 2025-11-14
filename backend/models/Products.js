import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  images: Array,
  description: String,
  stock: Number
});

export default mongoose.model('Product', productSchema);


