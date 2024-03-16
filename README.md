# WebNBA
A web page that can display data from NBA using React as a framework and NBA.api as an api

1. `npm install` para instalar las dependencias y que se cree el folder de node_modules
2. `npm start`

## TODO List
- [x] See playerDetails
- [ ] Meter botones "Last 10 games" y "Current season stats" en playerDetails
- [ ] ~~Meter filtro por teams a los players, mapear cada team con id manualmente para saber que llamadas hacer (o buscar otra forma = get teams from east and west)~~ (este es imposible con este api y mejor no xdd)
- [ ] Equipos: Más o menos la misma lógica de diseño que los jugadores, obtener todos los equipos del api con el param: conference (east y west), guardarlo en cache para no hacer muchas calls  y acomodarlos todos con team card con imagen y nombre de equipo (como en players), al hacer click se muestran sus 10 partidas mas recientes??? o no se, al obtener los equipos con east y west se puede meter un filtro por conference facil
- [ ] En leaderboards, obtener los datos de get:"standings/"
parameters:
league:"standard"
season:"2023"

**NOTE:** El api cuenta season=2023 como la de season 2024 también lol y por eso season=2024 nunca retorna nada