export const isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'No autorizado. Inicie sesión.' });
}