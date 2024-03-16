# WebNBA
A web page that can display data from NBA using React as a framework and NBA.api as an api

1. `npm install` para instalar dependencias
2. `npm start`

## TODO List
- [x] See playerDetails
- [x] Botón Last 10 games en el playercard de un jugador. (Not commited yet)
- [ ] Botón Current season stats en el playercard del jugador.
- [ ] ~~Agregar filtro por equipos a los jugadores~~ (Este es imposible con este API freemium así que mejor no xdd)
- [ ] Equipos: Más o menos la misma lógica de diseño que los jugadores, obtener todos los equipos del api con el param: conference (east y west), guardarlo en cache para no hacer muchas calls  y acomodarlos todos con team card con imagen y nombre de equipo (como en players), al hacer click se muestran sus 10 partidas mas recientes??? o no se, al obtener los equipos con east y west se puede meter un filtro por conference facil
- [ ] En leaderboards, obtener los datos de get:"standings/"
parameters:
league:"standard"
season:"2023"

**NOTE:** El api cuenta season=2023 como la de season 2024 también lol y por eso season=2024 nunca retorna nada
