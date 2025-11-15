import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/Users.js";
import { productRouter } from "./routes/productRoutes.js";
import { loginRouter } from "./routes/loginRoutes.js";


dotenv.config();

const app = express();
const PORT = 3000;
const isTest = process.env.NODE_ENV === 'test';

// --- Función para la conexión a DB ---
const connectDB = () => {
    // Si la variable de entorno MONGO_URL no está definida, no intentamos conectar
    if (!process.env.MONGO_URL) {
        console.error("❌ MONGO_URL no está definido. Saltando conexión.");
        return; // Salir de la función si la URL es nula
    }

    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('✅ Conectado a MongoDB'))
        .catch(err => console.error('❌ Error de conexión a MongoDB:', err));
};
// ----------------------------------------

const allowedOrigins = [
  "http://localhost:5173",
  "https://ifts-29-tpi-dev-ops.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(json());
app.use(urlencoded({ extended: true }));


// Conexión a base de datos Mongo: Solo se llama si NO estamos en modo test.
// Para los tests, la conexión debe ser mockeada o saltada.
if (!isTest) {
    connectDB();
} else {
    console.log('Modo de prueba activo. Se omite la conexión a MongoDB.');
}


app.use(session({
  secret: 'secreto',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Estrategia local de Passport (usa el modelo User que ya mockeaste)
passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username });
  if (!user) return done(null, false, { message: 'Usuario no encontrado' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Redireccionamiento a las url con sus correspondientes rutas
app.use('/', loginRouter);
app.use('/products', productRouter);


// Solo iniciar el servidor (listen) si NO estamos en modo test.
// Jest y Supertest necesitan exportar 'app' sin iniciar el listener.
if (!isTest) {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}


export default app;
