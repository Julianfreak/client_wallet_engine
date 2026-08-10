# React + Vite

Esta plantilla ofrece una configuración mínima para poner en marcha React con Vite, incluyendo HMR y algunas reglas de ESLint.

Actualmente, hay dos plugins oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

El compilador de React no está habilitado en esta plantilla debido a su impacto en el rendimiento del desarrollo y la compilación. Para añadirlo, consulta [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration


Si está desarrollando una aplicación de producción, le recomendamos usar TypeScript con reglas de lint conscientes de tipos habilitadas. Consulte [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para obtener información sobre cómo integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en su proyecto.

# Client Wallet Engine 🚀

Interfaz de usuario moderna desarrollada para la gestión de la billetera digital, construida con React, Vite y Tailwind CSS, diseñada para conectarse de manera fluida con el backend en Go.

---

## 🛠️ Tecnologías Utilizadas

* **React (Vite):** Librería principal para la interfaz de usuario basada en componentes.
* **Tailwind CSS:** Framework de estilos utilitarios para un diseño moderno, responsivo y en modo oscuro por defecto.
* **Nginx:** Servidor web utilizado en el contenedor de producción para servir los archivos estáticos optimizados.

---

## 📂 Estructura del Proyecto

```text
src/
├── components/          # Componentes independientes (Login, Register)
├── layouts/             # Contenedores estructurales (DashboardLayout con barra de navegación)
├── views/               # Vistas internas post-login (Dashboard, Movimientos)
├── services/            # Capa de comunicación con la API (Axios / Fetch)
├── App.jsx              # Enrutador y gestor de estados principales de la aplicación
└── main.jsx             # Punto de entrada de React