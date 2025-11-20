# Runbook de despliegue (resumen)

Este documento contiene pasos y comprobaciones básicas para desplegar y verificar la aplicación.

1) Preparación
- Asegurarse de que las secrets están configuradas en el entorno de despliegue (Render/Vercel/Docker).
- Confirmar que las variables de entorno necesarias existen (ver `.env.example`).

2) Despliegue local con Docker Compose (recomendado para pruebas)

```powershell
cd <repo-root>
docker-compose up --build
```

Ver servicios:
- Frontend: http://localhost (puerto 80)
- Backend: http://localhost:3000

3) Verificaciones post-deploy (checklist mínimo)
- Revisar que el contenedor backend responde en `GET /health`:
  - `curl http://localhost:3000/health`  o `Invoke-RestMethod http://localhost:3000/health`
  - Respuesta esperada: `{ "status": "ok", "db": "connected" }` (db puede ser `connected`, `connecting`, `disconnected` o `disconnecting`).
- Revisar logs del backend: `docker-compose logs backend -f` o en la plataforma de hosting.
- Verificar que frontend carga y puede llamar a la API (panel, listado de productos).

4) Rollback (manual)
- Si la nueva versión falla, detener contenedores y restaurar la versión anterior (Image tag o commit conocido).
- En Docker Compose local, reconstruir a la versión anterior o usar `docker-compose down` y volver a levantar con la imagen/tag deseada.

5) Resolución rápida de fallos
- Si `/health` devuelve `db: disconnected`:
  - Verificar cadena `MONGO_URL` y accesibilidad del servicio Mongo.
  - Revisar volúmenes y permisos del contenedor de MongoDB.
- Si la API no responde:
  - Revisar `docker-compose logs backend -f` o logs en Render.
  - Comprobar variables de entorno mal configuradas o valores de `SESSION_SECRET` faltantes.

6) Scripts útiles (local/manual)
- `backend/scripts/seedSampleProducts.js`: script manual para poblar datos de prueba. Ejecutar con `node backend/scripts/seedSampleProducts.js` (requiere `MONGO_URL` configurada).

7) Buenas prácticas
- No subir credenciales al repositorio. Usar `.env.example` para documentar variables.
- Añadir healthcheck en la plataforma de despliegue apuntando a `http://<host>:3000/health`.
