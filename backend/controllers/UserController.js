import User from "../models/Users.js";
import passport from "passport";

// Controlador para realizar login de usuario

export const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error durante la autenticación' });
    if (!user) return res.status(401).json({ message: info?.message || 'Credenciales inválidas' });

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error al iniciar sesión' });

      return res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          username: user.username
        },
      });
    });
  })(req, res, next);
};

export const logOut = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Error al cerrar sesión' });
    res.json({ message: 'Sesión cerrada correctamente' });
  });
};

// Controlador para registrar usuarios

export const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('Ese usuario ya existe');
    }

    const user = new User({ username, password, role });

    await user.save();

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Error durante el registro');
  }
};



