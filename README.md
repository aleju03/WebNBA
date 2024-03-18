# WebNBA
A web page that can display data from NBA using React as a framework and NBA.api as an api

1. `npm install` para instalar dependencias
2. `npm start`


## Done
- [x] See playerDetails
- [x] Add "Force player search" to players ? and use fallback-image as their pfp **(Técnicamente sirve desde el backend pero no en frontend aún)** Esto lo que hace es buscar jugadores directamente desde el api y no del csv, sería como una búsqueda individual. Por defecto se está sacando los jugadores de un archivo .csv en /public para crear las player cards (SOLO NOMBRE Y FOTO DE PERFIL, osea ya cuando se clickea en el jugador y todo lo demás eso si se obtiene del api), ya que obtenerlos todos desde el api inicialmente serían más llamadas de lo que nos permite el plan freemium.
- [x] Fix Force Player search
- [x] Button: Last 10 games on a playercard: View a player's last 10 games and their stats on every one of those games
- [x] Button: Current season stats on a playercard = Stats de la season actual de ese jugador ( o si es un jugador viejo, las últimas stats registradas)
- [x] Equipos: Obtener todos los equipos del api con el param: conference (east y west), guardarlo en cache para no hacer muchas calls  y acomodarlos todos con team card con imagen y nombre de equipo (como en players), al hacer click se muestran estadísticas de la temporada actual
- [x] Agregar filtro por conferencia en los equipos
- [x] Add leaderboards module for current season
- [x] Add conference filter to Leaderboard
## TODO List
- [x] Agregar "Live Games" en Games para que el usuario pueda ver si hay algún partido de NBA ocurriendo en el momento. // Get games in live
get("https://v2.nba.api-sports.io/games?live=all"); (Extra optional)
- [ ] Posibilidad de ver los últimos 10 partidos de un equipo (Obtener todos sus partidos por season=2023 del equipo y usar los ultimos 10 responses)

**NOTE:** El api cuenta season=2023 como la de season 2024 también lol y por eso season=2024 nunca retorna nada
