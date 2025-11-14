import Router from 'express';
import { logOut, loginUser, registerUser } from '../controllers/UserController.js';

const router = Router();

// Genero las rutas para el login predefinidas en el archivo UserController.js

router.post('/', loginUser);

router.post('/logout', logOut);

router.post('/register', registerUser);

export const loginRouter = router;