# ToDoApp

Una aplicación de gestión de tareas minimalista construida con Ionic y Angular.

## 📱 Características

- **Gestión de tareas**: Crear, completar y eliminar tareas
- **Categorías**: Personal, Trabajo, Compras, Salud, Otro
- **Filtrado**: Filtrar por categoría y estado (activas/completadas)
- **Estadísticas**: Seguimiento del progreso en tiempo real
- **Persistencia**: Datos almacenados en localStorage

## 🛠️ Tecnologías

- [Ionic Framework](https://ionicframework.com/) 8.0
- [Angular](https://angular.io/) 20.0
- [Capacitor](https://capacitorjs.com/) 8.1
- [Firebase](https://firebase.google.com/) (configurado)
- TypeScript 5.9
- RxJS

## 🚀 Inicio rápido

### Requisitos previos

- Node.js 18+
- npm o bun

### Instalación

```bash
# Instalar dependencias
npm install
# o con bun
bun install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start
# o con bun
bun start
```

Accede a `http://localhost:8100`

### Construir para Android

```bash
# Sincronizar con Android
npx cap sync android

# Construir APK de debug
cd android && ./gradlew assembleDebug
```

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── models/
│   │   └── task.model.ts       # Interfaces y tipos de tareas
│   ├── pages/
│   │   └── home/               # Página principal
│   ├── services/
│   │   └── task.service.ts     # Lógica de negocio
│   └── app.component.ts        # Componente raíz
├── environments/               # Configuración de entorno
└── theme/
    └── variables.scss          # Variables de tema Ionic
```

## 🎨 Modelo de datos

### Task

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `string` | Identificador único |
| `title` | `string` | Título de la tarea |
| `description` | `string?` | Descripción opcional |
| `completed` | `boolean` | Estado de completado |
| `category` | `TaskCategory` | Categoría de la tarea |
| `createdAt` | `Date` | Fecha de creación |
| `updatedAt` | `Date` | Fecha de actualización |

### TaskCategory

- `personal` - Azul
- `trabajo` - Rojo
- `compras` - Verde
- `salud` - Amarillo
- `otro` - Gris

## 🔧 Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Iniciar servidor de desarrollo |
| `npm run build` | Construir para producción |
| `npm run test` | Ejecutar pruebas unitarias |
| `npm run lint` | Ejecutar linter |

## 📄 Licencia

MIT
