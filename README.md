
#### `README.md`
```markdown
# Sistema de Gestión de Torneos

## Requisitos
- Node.js 20+
- MongoDB

## Instalación
```bash
npm install
```

## Uso
```bash
npm start
```

## Endpoints Principales
- **Torneos**: `/tournaments`
- **Partidas**: `/matches`

## Jobs
- Inicio automático de torneos
- Verificación de timeouts
```



## Índice

- [Rutas de Torneos](#rutas-de-torneos)
  - [Crear un Torneo](#crear-un-torneo)
  - [Obtener Todos los Torneos](#obtener-todos-los-torneos)
  - [Obtener un Torneo por ID](#obtener-un-torneo-por-id)
  - [Actualizar un Torneo](#actualizar-un-torneo)
  - [Eliminar un Torneo](#eliminar-un-torneo)
  
- [Rutas de Partidas](#rutas-de-partidas)
  - [Crear una Partida](#crear-una-partida)
  - [Obtener Todas las Partidas](#obtener-todas-las-partidas)
  - [Obtener una Partida por ID](#obtener-una-partida-por-id)
  - [Actualizar el Estado de una Partida](#actualizar-el-estado-de-una-partida)

---

## Rutas de Torneos

### 1. **Crear un Torneo**
Ruta para crear un nuevo torneo.

- **Endpoint**: `/api/tournaments`
- **Método HTTP**: `POST`
- **Descripción**: Cr
