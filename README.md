# WebNBA
A web page that can display data from NBA using React as a framework and NBA.api as an api

1. `npm install` to install dependencies
2. `npm start` to host the app


## Tasks list
- [x] See playerDetails
- [x] Add "Force player search" to players ? and use fallback-image as their pfp **(Technically it works from the backend but not in the frontend yet)** This searches for players directly from the API and not from the CSV file, it would be like an individual search. By default, players are being fetched from a .csv file in /public to create the player cards (ONLY NAME AND PROFILE PICTURE, i.e., when you click on the player and everything else, that is obtained from the API), since obtaining them all from the API initially would be more calls than the freemium plan allows us.
- [x] Fix Force Player search
- [x] Button: Last 10 games on a playercard: View a player's last 10 games and their stats on every one of those games
- [x] Button: Current season stats on a playercard = Stats of the current season for that player (or if it's an old player, the last recorded stats)
- [x] Teams: Get all teams from the API with the param: conference (east and west), save it in cache to avoid making many calls, and arrange them all with team cards with image and team name (like in players), when clicked it shows statistics of the current season
- [x] Add conference filter to teams
- [x] Add leaderboards module for current season
- [x] Add conference filter to Leaderboard
- [x] Add "Live Games" in Games so the user can see if there is any NBA game happening at the moment. // Get games in live
get("https://v2.nba.api-sports.io/games?live=all"); (Extra optional)
- [x] Button to see the last 10 games of a team (Get all their games by season=2023 of the team and use the last 10 responses)
