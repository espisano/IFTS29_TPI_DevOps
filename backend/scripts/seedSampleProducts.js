import mongoose from 'mongoose';
import Product from '../models/Products.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO = process.env.MONGO_URL;

async function seed() {
  if (!MONGO) {
    console.error('MONGO_URL no definido en variables de entorno. Cancelando seed.');
    process.exit(1);
  }

  await mongoose.connect(MONGO, { });
  console.log('Conectado a Mongo para seed');

  const samples = [
    {
      name: 'Silla Madera Simple',
      description: 'Silla artesanal de madera maciza',
      price: 12500,
      stock: 10,
      images: [],
    },
    {
      name: 'Mesa de Comedor Mediana',
      description: 'Mesa ideal para 4 personas',
      price: 45000,
      stock: 5,
      images: [],
    }
  ];

  try {
    await Product.insertMany(samples);
    console.log('Seed completado.');
  } catch (err) {
    console.error('Error insertando samples:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('seedSampleProducts.js')) {
  seed();
}
