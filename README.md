
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

- [Rutas de Torneos](#http://localhost:3000/tournaments)
  - [Crear un Torneo](#http://localhost:3000/tournaments) POST
  - [Obtener Todos los Torneos](#http://localhost:3000/tournaments) GET queryParam startDate & status
  
- [Rutas de Partidas](#http://localhost:3000/matches)
  - [Crear una Partida](#http://localhost:3000/matches) POST
  - [Moditifar una Partida](#http://localhost:3000/matches/:id) PUT


```


## Body ejemplo Torneo
```bash
{
  "name": "Campeonato Nacional 2025",
  "startDate": "2025-02-15T10:00:00Z",
  "status": "PENDING",
  "participants": 16,
  "matches": [] 
}
```


## Body ejemplo Partida
```bash
{
  "tournamentId": "6791859a8c8f52d24658bdeb",  
  "player1": "Jugador 1",
  "player2": "Jugador 2",
  "status": "PENDING",
  "winner": null,
  "score": {
    "player1Score": 0,
    "player2Score": 0
  },
  "startTime": "2025-02-16T12:00:00Z",
  "timeLimit": 60,
  "completedAt": null
}
```

## Body ejemplo Partida modificar (ruta #http://localhost:3000/matches/:id)
```bash
{
  "tournamentId": "6791859a8c8f52d24658bdeb",  
  "player1": "Jugador 1",
  "player2": "Jugador 2",
  "status": "PENDING",
  "winner": null,
  "score": {
    "player1Score": 0,
    "player2Score": 0
  },
  "startTime": "2025-02-16T12:00:00Z",
  "timeLimit": 60,
  "completedAt": null
}
```