-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Ten owner user, named owner1 with passwor 0wn3r
INSERT INTO authorities(id, authority) VALUES (2, 'PLAYER');
INSERT INTO appusers(id, username, password, authority) VALUES (4, 'player1', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (5, 'player2', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (6, 'player3', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (7, 'player4', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (8, 'player5', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);
INSERT INTO appusers(id, username, password, authority) VALUES (9, 'player6', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 2);

INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(4, 'Daniel', 'Fernandez Caballero', 'https://pbs.twimg.com/profile_images/1875354853/actor_400x400.jpg', 'sudani', 'danifercaba@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(5, 'Francisco', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sucapo', 'capot@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(6, 'Alvaro', 'Martin Muñoz', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sualva', 'alvaro@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(7, 'Pepe', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'supepe', 'total_score@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(8, 'Conrado', 'Menendez Marquez', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'suconra', 'conrado@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');
INSERT INTO players(id, name, surname, avatar, nickname, email, biography, location, birthdate, favorite_genres, favorite_platforms, favorite_sagas) VALUES 
(9, 'Seco', 'Keyo Marlin', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sukeyo', 'secaca@gmail.com', 'Avid gamer and tech enthusiast.', 'Madrid', '1990-05-15', 'Accion', 'Netflix', 'Star Wars');

INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (1, 'Match 1',null,null, 'IN_PROGRESS', null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (2, 'Match 2',null,null, 'CLOSED', null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (3, 'DO_NOT_ENTRY',null,null, 'OPEN', null);
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (4, 'Match 3','2024-09-11T17:59:36','2024-09-11T17:40:53', 'CLOSED', 'player1');
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (5, 'Match 4','2024-09-11T17:43:36','2024-09-11T17:40:53', 'CLOSED', 'player1');
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (6, 'Match 5','2024-09-11T17:46:36','2024-09-11T17:40:53', 'CLOSED', 'player2');
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (7, 'Match 6','2024-09-11T18:00:36','2024-09-11T17:40:53', 'CLOSED', 'player1');
INSERT INTO matches (id, name,finish_date,start_date, match_state, winner) VALUES (8, 'Match 7','2024-09-11T17:49:36','2024-09-11T17:40:53', 'CLOSED', 'player3');


INSERT INTO joined_players (match_id, player) VALUES (1, 'player1');
INSERT INTO joined_players (match_id, player) VALUES (1, 'player2');
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

