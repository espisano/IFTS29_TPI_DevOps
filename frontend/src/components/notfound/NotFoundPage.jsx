import React from "react";

const NotFoundPage = () => (
  <div style={{
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  }}>
    <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
    <h2>Página no encontrada</h2>
    <p>La página que buscas no existe o fue movida.</p>
  </div>
);

export default NotFoundPage;