# Plataforma de Gestión Clínica

Aplicación completa para la gestión de una clínica médica desarrollada con Node.js.

## Stack tecnológico

- **Backend:** Node.js + Express
- **Base de datos relacional:** PostgreSQL + Sequelize
- **Base de datos documental:** MongoDB + Mongoose
- **Tiempo real:** Socket.IO
- **Autenticación:** JWT
- **API alternativa:** GraphQL (Apollo Server)

## Instalación

```bash
npm install
```

Configura el `.env` usando `.env.example` como referencia.

## Arrancar el proyecto

```bash
npm run dev
```

## Credenciales de prueba

| Rol | Email | Password |
|-----|-------|----------|
| Admin | admin@clinica.com | 123456 |
| Médico | Laura3@yahoo.com | 123456 |
| Recepcionista | Roberto.MataVaca11@hotmail.com | 123456 |

## Base de datos

Importar PostgreSQL:
```bash
psql clinica_dev < db/clinica_dev.sql
```

Importar MongoDB:
```bash
mongoimport --db clinica_mongo --collection historialclinicos --file db/historial.json
```

## Endpoints principales

### Auth
- POST /api/auth/registro
- POST /api/auth/login

### Pacientes
- GET /api/pacientes
- POST /api/pacientes
- POST /api/pacientes/generar/:cantidad (solo admin)
- DELETE /api/pacientes/:id (solo admin)

### Citas
- GET /api/citas
- POST /api/citas
- PATCH /api/citas/:id/estado
- PATCH /api/citas/:id/cancelar
- DELETE /api/citas/:id (solo admin)

### Historial clínico
- GET /api/historial/:id_paciente
- POST /api/historial/:id_paciente

### GraphQL
- POST /graphql

## Cliente
Accede al cliente en: http://localhost:9090
