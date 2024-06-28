-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Ten owner user, named owner1 with passwor 0wn3r
INSERT INTO authorities(id, authority) VALUES (3, 'PLAYER');
INSERT INTO appusers(id, username, password, authority) VALUES (4, 'player1', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);
INSERT INTO appusers(id, username, password, authority) VALUES (5, 'player2', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);
INSERT INTO appusers(id, username, password, authority) VALUES (6, 'player3', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);
INSERT INTO appusers(id, username, password, authority) VALUES (7, 'player4', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);
INSERT INTO appusers(id, username, password, authority) VALUES (8, 'player5', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);
INSERT INTO appusers(id, username, password, authority) VALUES (9, 'player6', '$2a$10$DaS6KIEfF5CRTFrxIoGc7emY3BpZZ0.fVjwA3NiJ.BjpGNmocaS3e', 3);

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

INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (1, 'POSE DEFENSIVA', 'Ganas un punto de precision, Puedes gastar 2 balas para prevenenir daño que se te fuera hacer este turno', 5, 'AIM', 2, 1, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (2, 'MAL DE OJO', 'Elige una al final del turno: • Ganas 2 puntos de precisión. • Descarta esta carta y roba otra. Iguala tus puntos de precisión a los de tu rival.', 6, 'AIM', 0, 2, 'true');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (3, 'MAXIMA CONCENTRACION', 'Ganas 2 puntos de precisión. Descarta esta carta y mira las 3 primeras cartas del mazo. Pon 1 en tu mano y descarta el resto.', 4, 'AIM', 0, 2, 'true');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (4, 'BALA TRAZADORA', 'Gasta 1 bala. Ganas 3 puntos de precisión. Tu precisión no puede reducirse este turno.', 1, 'AIM', 1, 3, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (5, 'LISTO PARA LA ACCION', 'Ganas 2 puntos de precisión. Si fuiste objetivo de una acción de "Disparo" en tu anterior turno, recarga 1 bala.', 3, 'AIM', 1, 2, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (6, 'NITIDEZ', 'Si ganaste precisión en tu anterior turno, ganas 3 puntos de precisión.', 6, 'AIM', 0, 3, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (7, 'PRECISION', 'Si tu objetivo tiene 4 o más puntos de precisión, ganas 4 puntos de precisión.', 2, 'AIM', 0, 4, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (8, 'PULSO FIRME', 'Si tienes menos puntos de salud que tu objetivo, ganas 4 puntos de precisión.', 1, 'AIM', 0, 4, 'false');
INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (9, 'MIRADA VENGATIVA', 'Si fuiste objetivo de una acción de "Disparo" en tu anterior turno, ganas 3 puntos de precisión.', 1, 'AIM', 0, 3, 'false');

INSERT INTO cards(id,name, action,power,category,bullet,accuracy,discart) VALUES (10, 'a', 'a', 5, 'DOGE', 2, 1, 'false');

