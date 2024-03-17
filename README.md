# WebNBA
A web page that can display data from NBA using React as a framework and NBA.api as an api

1. `npm install` para instalar dependencias
2. `npm start`

## TODO List
- [x] See playerDetails
- [x] Add "Force player search" to players ? and use fallback-image as their pfp **(Técnicamente sirve desde el backend pero no en frontend)** Esto lo que hace es buscar jugadores directamente desde el api y no del csv, sería como una búsqueda individual. Por defecto se está sacando los jugadores de un archivo .csv en /public (SOLO NOMBRE Y FOTO DE PERFIL, osea ya cuando se clickea en el jugador y todo lo demás eso si se obtiene del api) para crear las player cards, ya que obtenerlos todos desde el api de una serían más llamadas de lo que nos permite el api.
- [x] Button: Last 10 games on a playercard.
- [x] Button: Current season stats on a playercard.
- [x] Equipos: Obtener todos los equipos del api con el param: conference (east y west), guardarlo en cache para no hacer muchas calls  y acomodarlos todos con team card con imagen y nombre de equipo (como en players), al hacer click se muestran estadísticas de la temporada actual
- [x] Agregar filtro por conferencia en los equipos
- [ ] Posibilidad de ver los últimos 10 partidos de un equipo (Obtener todos sus partidos por season=2023 del equipo y usar los ultimos 10 responses)
- [x] Ver estadisticas de temporada actual de equipos
- [ ] En leaderboards, obtener los datos de get:"standings/"
parameters:
league:"standard"
season:"2023" y gg

**NOTE:** El api cuenta season=2023 como la de season 2024 también lol y por eso season=2024 nunca retorna nada
