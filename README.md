# 💻 Seminario de Actualización DevOps - Trabajo Práctico Integrador

## Integrantes
* **Facundo Villarreal**
* **Mariano López**
* **Ernesto Pisano**
* **Comisión:** E | **Grupo:** 10

---

## 🚀 Descripción del Proyecto
El proyecto consistió en el desarrollo de una **plataforma de e-commerce transaccional** diseñada para la PyME "**Muebles del Valle**" (dedicada al diseño y fabricación de muebles artesanales).

El objetivo principal fue ofrecer una solución digital completa que integre la exposición del catálogo con la gestión de ventas en línea, priorizando la usabilidad y la eficiencia en la administración interna.

### Funcionalidades Clave para el Usuario
* **Visualización del Catálogo:** Exploración detallada de muebles artesanales con imágenes y descripciones.
* **Gestión de Carrito:** Funcionalidad para añadir, modificar y eliminar productos antes de finalizar la compra.
* **Proceso de Checkout Simulado:** Simulación de un proceso de compra transaccional que permite la generación de pedidos de manera clara y segura.

---

## 🛠️ Desarrollo de la Aplicación (Stack Tecnológico)

### Frontend (React / Vite)
El frontend fue desarrollado utilizando **React** con **Vite** como entorno de desarrollo para recarga rápida y mejor rendimiento.
* **Manejo de Rutas:** `React Router DOM`.
* **Diseño Visual:** `Bootstrap` (incluyendo `react-bootstrap` y `bootstrap-icons`).
* **Comunicación con API:** `Axios`.

### Backend y Base de Datos (Node.js / Express / MongoDB)
* **Backend:** Construido con **Express.js**.
* **Base de Datos:** Arquitectura **NoSQL** basada en **MongoDB**, gestionada a través del Object Data Modeling (ODM) de **Mongoose**. Esta elección es ideal para una gestión flexible de datos en una plataforma de e-commerce.
* **Autenticación:** Se implementó un mecanismo de autenticación con **Passport.js** (estrategia Local). Las contraseñas se gestionan de forma segura utilizando la función de **hashing `bcrypt`**.

---

## 🧪 Pruebas Automatizadas
Para asegurar la calidad, se incorporaron pruebas funcionales automatizadas tanto para el frontend como para el backend.

### Backend (Pruebas de API/Endpoints)
* **Herramientas:** **Jest** junto con **Supertest**.
* **Alcance:** Pruebas funcionales sobre los endpoints de la API REST, validando el comportamiento de las rutas HTTP y la lógica de negocio.
* **Aislamiento:** Se utiliza `jest.mock()` para simular dependencias externas (como el modelo de Mongoose) y probar escenarios de éxito o fallo de la DB sin afectar datos reales.

### Frontend (Pruebas de Componentes React)
* **Herramientas:** **Jest** con el entorno JSDOM y **@testing-library/react**.
* **Validación:** Se prueba la interacción del usuario (ej. funcionalidad de búsqueda) y la lógica de renderizado condicional, asegurando que los filtros sean insensibles a mayúsculas y acentos.
* **Ejecución:** Todas las pruebas se ejecutan mediante el comando `npm test`.

---

## 🐳 Dockerización
El sistema utiliza una arquitectura de **microservicios desacoplados** (Frontend y Backend). Se utiliza **Docker Compose** para definir y correr la arquitectura multi-servicio en el entorno de desarrollo.

### Contenedores Definidos
| Servicio | Imagen / Build | Puerto (Contenedor) | Puerto (Host) | Funcionalidad | Base de Datos Real |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **frontend** | Build personalizado (Vite + Nginx) | 80 | 80 | Interfaz de usuario en React (Servido por Nginx) | N/A |
| **backend** | Build personalizado (Node.js/Express) | 3000 | 3000 | API REST con Express | MongoDB (Usando Mongoose) |
| **mongo** | `mongo:6` | 27017 | 27017 | Base de datos NoSQL para la persistencia de datos | MongoDB |

### Configuración del Despliegue del Frontend (Nginx)
La dockerización del frontend implementa una estrategia de **construcción multi-etapa**, culminando con la entrega de la aplicación mediante el servidor web **Nginx**. Esto requiere un archivo `nginx.conf` personalizado ya que el servidor interno de Vite no está disponible en producción.

### Comandos de Orquestación
* **Levantar el sistema (Construir Imágenes y Crear Contenedores):**
    ```bash
    docker-compose up --build
    ```
    Este comando construye las imágenes personalizadas y levanta los tres contenedores (`backend`, `frontend`, y `mongo`).
* **Detener el sistema:**
    ```bash
    docker-compose down
    ```
    Este comando detiene el sistema y elimina los contenedores y redes asociadas (sin borrar el volumen de datos de MongoDB).
* **Monitorear logs en tiempo real:**
    ```bash
    docker-compose logs -f
    ```
    Utilizado para facilitar la depuración y la identificación de problemas de conexión.

---

## 🔄 Despliegue e Infraestructura (CI/CD)
El proyecto utiliza servicios modernos de *cloud hosting* que garantizan la Integración Continua (CI) y el Despliegue Continuo (CD).

* **Frontend Deployment:** **Vercel**.
* **Backend & DB Deployment:** **Render**.

### Estrategia de CI/CD: GitHub Actions Workflow
El flujo de CI/CD está definido en el archivo `ci-cd.yml` y consta de tres *jobs* secuenciales.

#### 1. Job 1: Integración Continua (CI) - Build & Run Tests
* **Disparadores:** `push` o `pull request` a las ramas `develop` o `main`.
* **Acciones:** Ejecuta las **Pruebas de Backend** (Jest/Supertest, sin conexión a DB real) y las **Pruebas de Frontend** (Jest/React Testing Library).

#### 2. Job 2: Containerización - Docker Build & Push
* **Condición:** Solo si el Job 1 (`ci`) finaliza exitosamente.
* **Acciones:**
    * Autenticación en **Docker Hub**.
    * Construcción de las imágenes Docker (`frontend` y `backend`).
    * Etiquetado de imágenes con `latest` y un tag inmutable (SHA del commit).
    * `Push` de ambas imágenes a Docker Hub.

#### 3. Job 3: Despliegue Continuo (CD) - Automatic Deployment
* **Condición:** Solo si hay `push` a la rama `main` **Y** el Job 2 (`docker_push`) fue exitoso.
* **Acciones:**
    * **Despliegue del Backend (Render):** Se fuerza un `redeploy` del servicio de Render mediante una llamada `curl` a su API. Render descarga automáticamente la nueva imagen etiquetada como `latest` desde Docker Hub.
    * **Despliegue del Frontend (Vercel):** Se utiliza una *action* de terceros (`amondnet/vercel-action@v25`) para desplegar la carpeta del frontend en modo de producción.

### Diagrama del Pipeline DevOps


---

## 🔗 Control de Versiones
El proyecto está versionado en **GitHub** con la siguiente estructura de ramas:
* **`main`:** Rama principal con la versión estable del sistema.
* **`develop`:** Rama destinada para pruebas y *test*.
* **Ramas de desarrollo individual:** (`Facu_Branch`, `Mariano_Branch`, `Pisa_Branch`, etc.) donde cada integrante implementa nuevas funcionalidades o mejoras específicas.

### Repositorios
* **Fork para DevOps:** `https://github.com/espisano/IFTS29_TPI_DevOps` 
* **Frontend:** `https://github.com/marianohlopez/IFTS29-Tpfinal-Frontend` 
* **Backend:** `https://github.com/marianohlopez/IFTS29-Tpfinal-Backend` 

---

## 👤 Roles y Contribuciones
| Colaborador | Rol Principal | Contribuciones Clave |
| :--- | :--- | :--- |
| **Mariano Lopez** | Pipeline CI/CD y Testing | Implementación completa de la pipeline CI/CD con GitHub Actions (incluyendo automatización de pruebas de Frontend y Backend). Configuración de Docker Login y gestión de secrets. |
| **Ernesto Pisano** | Arquitectura y Contenedores | Gestión del repositorio Git (estrategia de ramas y merges). Configuración de contenedores Docker y orquestación de servicios mediante Docker Compose. Aseguramiento de la comunicación interna de la red de contenedores. |
| **Facundo Villarreal** | Despliegue y Resolución de Fallos | Despliegue del Frontend en Vercel y del Backend en Render. Investigación y resolución de fallos críticos en el despliegue (errores de autenticación y CORS) y de la aplicación local (configuración de Nginx para SPA). |

---

## 🌐 Enlace a la Web
Puedes ver la plataforma en funcionamiento en:
`https://ifts-29-tpi-dev-ops.vercel.app/`
