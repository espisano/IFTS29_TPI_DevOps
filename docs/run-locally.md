# Ejecutar localmente (resumen)

Opciones para levantar la aplicación localmente.

Con Docker (recomendado):

1. En la raíz del repo:

```powershell
docker-compose up --build
```

2. Los servicios por defecto:
- Frontend: http://localhost (puerto 80)
- Backend: http://localhost:3000
- MongoDB: 27017

Sin Docker (instalando localmente):

Backend:

```powershell
cd backend
npm install
setx MONGO_URL "mongodb://localhost:27017/tu_db"
npm test    
node app.js 
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Notas:
- No olvides usar `.env.example` como referencia para configurar variables de entorno.
- Algunos scripts (ej.: `backend/scripts/seedSampleProducts.js`) son manuales y no corren automáticamente.
