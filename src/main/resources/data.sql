-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Ten owner user, named owner1 with passwor 0wn3r
INSERT INTO authorities(id,authority) VALUES (3,'PLAYER');
INSERT INTO appusers(id,username,password,authority) VALUES (4,'owner1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (5,'owner2','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (6,'owner3','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (7,'owner4','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (8,'owner5','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (9,'owner6','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (10,'owner7','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (11,'owner8','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (12,'owner9','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);
INSERT INTO appusers(id,username,password,authority) VALUES (13,'owner10','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3);

INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(1, 'Daniel', 'Fernandez Caballero', 'https://pbs.twimg.com/profile_images/1875354853/actor_400x400.jpg', 'sudani', 'danifercaba@gmail.com','danfercab','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,0,0);
INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(2, 'Francisco', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sucapo', 'capot@gmail.com','fracapgar1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,13,0);
INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(3, 'Alvaro', 'Martin Muñoz', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sualva', 'alvaro@gmail.com','alvmarmun1','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,22,0);
INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(4, 'Pepe', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'supepe', 'total_score@gmail.com','pepforbin','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,1,0);
INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(5, 'Conrado', 'Fernandez Caballero', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'suconra', 'conrado@gmail.com','conrast','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,17,0);
INSERT INTO players(id, name, surname, avatar, nickname, email, username, password, authority, total_score, total_bloqs) VALUES 
(6, 'Seco', 'Keyo Marlin', 'https://cdn-icons-png.flaticon.com/512/603/603855.png', 'sukeyo', 'secaca@gmail.com','alepingar','$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e',3,17,0);

INSERT INTO achievement(id,name,description,threshold,badge_image,metric) VALUES (1,'Experiencia básica','Si juegas 10 partidas o más',10.0,'https://cdn-icons-png.flaticon.com/512/5243/5243423.png','GAMES_PLAYED');
INSERT INTO achievement(id,name,description,threshold,badge_image,metric) VALUES (2,'Explorador','Si juegas 25 partidas o más',25.0,'https://cdn-icons-png.flaticon.com/512/603/603855.png','GAMES_PLAYED');
INSERT INTO achievement(id,name,description,threshold,metric) VALUES (3,'Experto','Si ganas 20 partidas o más',20.0,'VICTORIES');

INSERT INTO matches (id,name, match_Time, n_rounds, max_players, score_crit, winner, creator, joined_Players, match_state)
VALUES (1,'Partida 1', 60, 10, 4, '["Score1", "Score2", "Score3"]', '', 1, '["Danfercab", "Fracapgar", "Alvmarmun"]', 1);
INSERT INTO matches (id,name, match_Time, n_rounds, max_players, score_crit, winner, creator, joined_Players, match_state)
VALUES (2,'Partida 2', 45, 15, 3, '["ScoreA", "ScoreB"]', 'Winner2', 2, '["Alepingar", "Oscmenmar"]', 2);

INSERT INTO cells(id, x, y, z) VALUES (1, 0, 0, 0); -- Celda central

-- Anillo 1
INSERT INTO cells(id, x, y, z) VALUES (2, 1, 0, -1);
INSERT INTO cells(id, x, y, z) VALUES (3, 1, -1, 0);
INSERT INTO cells(id, x, y, z) VALUES (4, 0, -1, 1);
INSERT INTO cells(id, x, y, z) VALUES (5, -1, 0, 1);
INSERT INTO cells(id, x, y, z) VALUES (6, -1, 1, 0);
INSERT INTO cells(id, x, y, z) VALUES (7, 0, 1, -1);

-- Anillo 2
INSERT INTO cells(id, x, y, z) VALUES (8, 2, 0, -2);
INSERT INTO cells(id, x, y, z) VALUES (9, 2, -1, -1);
INSERT INTO cells(id, x, y, z) VALUES (10, 2, -2, 0);
INSERT INTO cells(id, x, y, z) VALUES (11, 1, -2, 1);
INSERT INTO cells(id, x, y, z) VALUES (12, 0, -2, 2);
INSERT INTO cells(id, x, y, z) VALUES (13, -1, -1, 2);
INSERT INTO cells(id, x, y, z) VALUES (14, -2, 0, 2);
INSERT INTO cells(id, x, y, z) VALUES (15, -2, 1, 1);
INSERT INTO cells(id, x, y, z) VALUES (16, -2, 2, 0);
INSERT INTO cells(id, x, y, z) VALUES (17, -1, 2, -1);
INSERT INTO cells(id, x, y, z) VALUES (18, 0, 2, -2);
INSERT INTO cells(id, x, y, z) VALUES (19, 1, 1, -2);

-- Anillo 3
INSERT INTO cells(id, x, y, z) VALUES (20, 3, 0, -3);
INSERT INTO cells(id, x, y, z) VALUES (21, 3, -1, -2);
INSERT INTO cells(id, x, y, z) VALUES (22, 3, -2, -1);
INSERT INTO cells(id, x, y, z) VALUES (23, 3, -3, 0);
INSERT INTO cells(id, x, y, z) VALUES (24, 2, -3, 1);
INSERT INTO cells(id, x, y, z) VALUES (25, 1, -3, 2);
INSERT INTO cells(id, x, y, z) VALUES (26, 0, -3, 3);
INSERT INTO cells(id, x, y, z) VALUES (27, -1, -2, 3);
INSERT INTO cells(id, x, y, z) VALUES (28, -2, -1, 3);
INSERT INTO cells(id, x, y, z) VALUES (29, -3, 0, 3);
INSERT INTO cells(id, x, y, z) VALUES (30, -3, 1, 2);
INSERT INTO cells(id, x, y, z) VALUES (31, -3, 2, 1);
INSERT INTO cells(id, x, y, z) VALUES (32, -3, 3, 0);
INSERT INTO cells(id, x, y, z) VALUES (33, -2, 3, -1);
INSERT INTO cells(id, x, y, z) VALUES (34, -1, 3, -2);
INSERT INTO cells(id, x, y, z) VALUES (35, 0, 3, -3);
INSERT INTO cells(id, x, y, z) VALUES (36, 1, 2, -3);
INSERT INTO cells(id, x, y, z) VALUES (37, 2, 1, -3);

-- Anillo 4
INSERT INTO cells(id, x, y, z) VALUES (38, 4, 0, -4);
INSERT INTO cells(id, x, y, z) VALUES (39, 4, -1, -3);
INSERT INTO cells(id, x, y, z) VALUES (40, 4, -2, -2);
INSERT INTO cells(id, x, y, z) VALUES (41, 4, -3, -1);
INSERT INTO cells(id, x, y, z) VALUES (42, 4, -4, 0);
INSERT INTO cells(id, x, y, z) VALUES (43, 3, -4, 1);
INSERT INTO cells(id, x, y, z) VALUES (44, 2, -4, 2);
INSERT INTO cells(id, x, y, z) VALUES (45, 1, -4, 3);
INSERT INTO cells(id, x, y, z) VALUES (46, 0, -4, 4);
INSERT INTO cells(id, x, y, z) VALUES (47, -1, -3, 4);
INSERT INTO cells(id, x, y, z) VALUES (48, -2, -2, 4);
INSERT INTO cells(id, x, y, z) VALUES (49, -3, -1, 4);
INSERT INTO cells(id, x, y, z) VALUES (50, -4, 0, 4);
INSERT INTO cells(id, x, y, z) VALUES (51, -4, 1, 3);
INSERT INTO cells(id, x, y, z) VALUES (52, -4, 2, 2);
INSERT INTO cells(id, x, y, z) VALUES (53, -4, 3, 1);
INSERT INTO cells(id, x, y, z) VALUES (54, -4, 4, 0);
INSERT INTO cells(id, x, y, z) VALUES (55, -3, 4, -1);
INSERT INTO cells(id, x, y, z) VALUES (56, -2, 4, -2);
INSERT INTO cells(id, x, y, z) VALUES (57, -1, 4, -3);
INSERT INTO cells(id, x, y, z) VALUES (58, 0, 4, -4);
INSERT INTO cells(id, x, y, z) VALUES (59, 1, 3, -4);
INSERT INTO cells(id, x, y, z) VALUES (60, 2, 2, -4);
INSERT INTO cells(id, x, y, z) VALUES (61, 3, 1, -4);

UPDATE cells c1
SET adjacencies = (
    SELECT ARRAY_AGG(c2.id)
    FROM cells c2
    WHERE (
        (c2.x = c1.x AND c2.y = c1.y + 1) OR
        (c2.x = c1.x AND c2.y = c1.y - 1) OR
        (c2.x = c1.x - 1 AND c2.y = c1.y + 1) OR
        (c2.x = c1.x + 1 AND c2.y = c1.y - 1) OR
        (c2.x = c1.x - 1 AND c2.y = c1.y) OR
        (c2.x = c1.x + 1 AND c2.y = c1.y)
    )
    AND c1.id != c2.id
);

-- INSERT INTO matches(id, name, matchTime, nRounds, maxPlayers, scoreCrit, winner, creator_id, joinedPlayers, matchState) VALUES (1, 'Nombre del Partido', 60, 5, 4, '["Crit1", "Crit2", "Crit3"]', 'Nombre del Ganador', 1, '["Jugador1", "Jugador2", "Jugador3"]', 'OPEN');
