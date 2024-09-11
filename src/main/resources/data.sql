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

INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(4, 'Daniel', 'Fernandez Caballero', 'https://pbs.twimg.com/profile_images/1875354853/actor_400x400.jpg', 'sudani', 'danifercaba@gmail.com');
INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(5, 'Francisco', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sucapo', 'capot@gmail.com');
INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(6, 'Alvaro', 'Martin Muñoz', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sualva', 'alvaro@gmail.com');
INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(7, 'Pepe', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'supepe', 'total_score@gmail.com');
INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(8, 'Conrado', 'Menendez Marquez', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'suconra', 'conrado@gmail.com');
INSERT INTO players(id, name, surname, avatar, nickname, email) VALUES 
(9, 'Seco', 'Keyo Marlin', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sukeyo', 'secaca@gmail.com');

INSERT INTO matches (id, name, match_state, winner) VALUES (1, 'Match 1', 'IN_PROGRESS', null);
INSERT INTO matches (id, name, match_state, winner) VALUES (2, 'Match 2', 'CLOSED', null);
INSERT INTO matches (id, name, match_state, winner) VALUES (3, 'DO_NOT_ENTRY', 'OPEN', null);


INSERT INTO joined_players (match_id, player) VALUES (1, 'Player1');
INSERT INTO joined_players (match_id, player) VALUES (1, 'Player2');
INSERT INTO joined_players (match_id, player) VALUES (2, 'Player1');
INSERT INTO joined_players (match_id, player) VALUES (2, 'Player2');
INSERT INTO joined_players (match_id, player) VALUES (3, 'Player1');
INSERT INTO joined_players (match_id, player) VALUES (3, 'Player2');



INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (1,4,5,'ACCEPTED'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (2,7,4,'PENDING'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (3,4,6,'ACCEPTED'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (4,8,4,'PENDING'); 

INSERT INTO request (id, player_one_id, player_two_id, status) VALUES (5,9,6,'PENDING'); 
