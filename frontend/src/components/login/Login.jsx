import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://ifts29-tpfinal-backend.onrender.com",
        form,
        { withCredentials: true }
      );

      if (res.data.user) {
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/admin/stock");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        <div className="form-group-login">
          <label>Usuario</label>
          <input
            type="text"
            name="username"
            placeholder="Ingrese su usuario"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group-login">
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="button-login" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
