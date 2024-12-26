# Proyecto de Reservas

## Descripción del Proyecto

Este proyecto es una API REST para la gestión de reservas de espacios compartidos. Permite a los usuarios registrarse, iniciar sesión, listar reservas disponibles, crear nuevas reservas y cancelar reservas existentes. Los administradores tienen permisos adicionales para listar todas las reservas.

## Estructura del Proyecto

- config/
   - config.json
- controllers/
   - reservationController.js
   - userController.js
- dataBase/
   - connection.js
 -helpers/
- index.js
- middlewares/
   - auth.js
- migrations/
   - 20241225214657-create-users.js
   - 20241225214715-create-time-slots.js
   - 20241225214725-create-espacios.js
   - 20241225221014-create-reservations.js
- models/
   - index.js
   - reservationModel.js
   - shared_areaModel.js
   - time_slotModel.js
   - userModel.js
- package.json
- routes/
   - reservation.js
   - user.js
- seeders/
   - 20241225214946-demo-admin.js
   - 20241225215142-seed-time-slots.js
   - 20241225215155-demo-espacios.js
- services/
   - jwt.js
- index.js

## Instalación y Configuración

### Prerrequisitos

- Node.js
- MySQL

### Instalación

1. Clona el repositorio:

git clone https://github.com/Nelsonguardo/Backend-Reservation.git
cd Backend-Reservation

2. Instala las dependencias:

npm install

3. Configura la base de datos en config/config.json:

{
  "development": {
    "username": "root",
    "password": "admin",
    "database": "sapco",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

### Migraciones y Seeders

1. Ejecuta las migraciones para crear las tablas en la base de datos:

npx sequelize-cli db:migrate

2. Ejecuta los seeders para poblar la base de datos con datos iniciales:

npx sequelize-cli db:seed:all

## Ejecución del Proyecto

1. Inicia el servidor:

npm start

2. El servidor estará corriendo en http://localhost:3002.

## Endpoints

### Usuarios

- GET /api/users: Lista todos los usuarios (requiere autenticación).
- POST /api/users/login: Inicia sesión y devuelve un token.

### Reservas

- GET /api/reservations/available: Lista todas las reservas disponibles (requiere autenticación).
- GET /api/reservations: Lista todas las reservas (requiere autenticación).
- POST /api/reservations: Crea una nueva reserva (requiere autenticación).
- DELETE /api/reservations/:id: Cancela una reserva (requiere autenticación).

## Autenticación

El proyecto utiliza JWT para la autenticación. Los tokens se generan en el archivo services/jwt.js y se verifican en el middleware middlewares/auth.js.

## Modelos

- User (models/userModel.js): Representa a los usuarios.
- Reservation (models/reservationModel.js): Representa las reservas.
- Shared_area (models/shared_areaModel.js): Representa los espacios compartidos.
- Time_slot (models/time_slotModel.js): Representa los horarios disponibles.

## Controladores

- userController (controllers/userController.js): Maneja las operaciones relacionadas con los usuarios.
- reservationController (controllers/reservationController.js): Maneja las operaciones relacionadas con las reservas.

## Rutas

- user.js (routes/user.js): Define las rutas relacionadas con los usuarios.
- reservation.js (routes/reservation.js): Define las rutas relacionadas con las reservas.

## Base de Datos

La conexión a la base de datos se configura en dataBase/connection.js y se utiliza en los modelos y controladores.

## Migraciones

Las migraciones se encuentran en la carpeta migrations y se utilizan para crear las tablas en la base de datos.

## Seeders

Los seeders se encuentran en la carpeta seeders y se utilizan para poblar la base de datos con datos iniciales.

## Ejemplo de Uso


1. Inicia sesión con los usarios que se insertador en los seeders:

POST /api/users/login
{
  "email": "admin@admin.com",
  "password": "contrasena1"
}

2. Usa el token devuelto para autenticar las siguientes peticiones.

3. Lista todas las reservas disponibles:

GET /api/reservations/available
Authorization:  <TOKEN>

4. Crea una nueva reserva:

POST /api/reservations
Authorization:  <TOKEN>
{
  "space_id": 1,
  "time_slot_id": 1,
  "user_name": "John",
  "user_last_name": "Doe",
  "user_email": "john.doe@example.com",
  "number_phone": "1234567890"
}

5. Cancela una reserva:

DELETE /api/reservations/1
Authorization:  <TOKEN>
