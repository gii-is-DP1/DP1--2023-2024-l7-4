-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Ten player user, named owner1 with passwor pl4y3r
INSERT INTO authorities(id, authority) VALUES (2, 'PLAYER');
INSERT INTO appusers(id, username, password, authority) VALUES (4, 'player1', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (5, 'player2', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (6, 'player3', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (7, 'player4', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (8, 'player5', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (9, 'player6', '$2a$10$byH.Cnnm5dYaHOpaZh0CFubYf03fDoGl1ZAnCjY/aMLU1wu7IeMZy', 2);

INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(4, 'Daniel', 'Fernandez Caballero', 'https://pbs.twimg.com/profile_images/1875354853/actor_400x400.jpg', 'sudani', 'danifercaba@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', null, 'CASUAL', 0, null, 'false');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(5, 'Francisco', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sucapo', 'capot@gmail.com', 'I like football.', 'Sevilla', '2003-06-17', 'Comedia', null, 'Harry Potter, Dune', 'HARDCORE', 0, null, 'false');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(6, 'Alvaro', 'Martin Muñoz', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sualva', 'alvaro@gmail.com', null, 'Badajoz', '1998-01-12', 'Accion, Aventuras', 'HBO', 'Piratas del Caribe', 'HARDCORE', 0, null, 'false');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(7, 'Pepe', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'supepe', 'total_score@gmail.com', 'I am studying PE', 'Barcelona', null, 'Terror', 'Prime Video, IMDB', 'El Senor de los Anillos', 'HARDCORE', 0, null, 'false');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(8, 'Conrado', 'Menendez Marquez', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'suconra', 'conrado@gmail.com', 'I have four cats', 'Valencia', '2000-01-28', null, 'Netflix', 'Star Wars', 'HARDCORE', 0, null, 'false');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas, profile_type, games_played_today, last_game_date, online) VALUES 
(9, 'Seco', 'Keyo Marlin', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sukeyo', 'secaca@gmail.com', 'I do not know what is this', 'Don Benito', '2012-02-13', 'Drama', 'Disney Plus', null, 'HARDCORE', 0, null, 'false');

INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (2, 'Match 2',null,null, 'CLOSED', null,null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (3, 'DO_NOT_ENTRY',null,null, 'OPEN', null,null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (4, 'Match 3','2024-09-11T17:59:36','2024-09-11T17:40:53', 'CLOSED', 'player1',null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (5, 'Match 4','2024-09-11T17:43:36','2024-09-11T17:40:53', 'CLOSED', 'player1',null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (6, 'Match 5','2024-09-11T17:46:36','2024-09-11T17:40:53', 'CLOSED', 'player2',null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (7, 'Match 6','2024-09-11T18:00:36','2024-09-11T17:40:53', 'CLOSED', 'player1',null,null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner,played_cards0,played_cards1) VALUES (8, 'Match 7','2024-09-11T17:49:36','2024-09-11T17:40:53', 'CLOSED', 'player3',null,null);



INSERT INTO joined_players (match_id, player) VALUES (2, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (2, 'player2');
INSERT INTO joined_players (match_id, player) VALUES (3, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (3, 'player2');
INSERT INTO joined_players (match_id, player) VALUES (4, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (4, 'player2');
INSERT INTO joined_players (match_id, player) VALUES (5, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (5, 'player2');
INSERT INTO joined_players (match_id, player) VALUES (6, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (6, 'player2');
INSERT INTO joined_players (match_id, player) VALUES (7, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (7, 'player3');
INSERT INTO joined_players (match_id, player) VALUES (8, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (8, 'player3');

INSERT INTO achievement(id,metric,threshold,name) VALUES (1,1,'GAMESPLAYED','Play One Game' );
INSERT INTO achievement(id,metric,threshold,name) VALUES (2,1,'VICTORIES','Win One Game');
INSERT INTO achievement(id,metric,threshold,name) VALUES (3,10,'GAMESPLAYED','Play 10 Game');
INSERT INTO achievement(id,metric,threshold,name) VALUES (4,5,'VICTORIES','Win 5 Game');
INSERT INTO achievement(id,metric,threshold,name) VALUES (5,100,'GAMESPLAYED','Play 100 Game');
INSERT INTO achievement(id,metric,threshold,name) VALUES (6,1,'TOTALPLAYTIME','Play 1 minutes');
INSERT INTO achievement(id,metric,threshold,name) VALUES (7,100,'TOTALPLAYTIME','Play 100 minutes');
INSERT INTO achievement(id,metric,threshold,name) VALUES (8,13,'CARDPLAYED','Play card with id 13');

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (1,4,5,'ACCEPTED'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (2,7,4,'PENDING'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (3,4,6,'ACCEPTED'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (4,8,4,'PENDING'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (5,9,6,'PENDING'); 

