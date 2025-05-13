# 🧼 Clean Architecture Login API

¡Bienvenido! Este proyecto es una implementación de una **API de autenticación** utilizando **Clean Architecture** con tecnologías modernas como **Node.js**, **Express**, **MongoDB** y **TypeScript**. Está diseñado para ser escalable, mantenible y fácil de probar.

---

## 🧠 Arquitectura

Este proyecto sigue los principios de **Clean Architecture** propuestos por [Robert C. Martin (Uncle Bob)](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html), separando claramente:

- **Domain**: Reglas de negocio puras (entidades, interfaces, casos de uso)
- **Application**: Lógica de aplicación (casos de uso, DTOs)
- **Infrastructure**: Adaptadores (MongoDB, Express, JWT, etc.)
- **Interface/Delivery**: Entradas del usuario (controladores, rutas, validaciones)

---

## 🚀 Tecnologías

- 🔧 **Node.js** + **Express**: Framework de servidor
- 🛡️ **TypeScript**: Tipado estático y robustez en el código
- 📦 **MongoDB** + **Mongoose**: Base de datos NoSQL
- 🔐 **JWT**: Autenticación basada en tokens
- 🧪 **Jest**: Testing unitario
- ♻️ **Clean Architecture**: Separación clara de responsabilidades

---

## 📁 Estructura del Proyecto

```bash
.
├── src/
│   ├── domain/             # Entidades y contratos
│   ├── application/        # Casos de uso
│   ├── infrastructure/     # MongoDB, JWT, Express, repositorios
│   ├── presentacion/       # Controladores y rutas
│   └── config/             # Configuración general (base de datos, env vars)
├── tests/                  # Pruebas unitarias
├── .env                    # Variables de entorno
├── tsconfig.json           # Configuración TypeScript
└── package.json
