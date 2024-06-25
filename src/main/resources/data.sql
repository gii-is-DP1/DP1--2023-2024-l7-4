-- One admin user, named admin1 with passwor 4dm1n and authority admin
INSERT INTO authorities(id,authority) VALUES (1,'ADMIN');
INSERT INTO appusers(id,username,password,authority) VALUES (1,'admin1','$2a$10$nMmTWAhPTqXqLDJTag3prumFrAJpsYtroxf0ojesFYq0k4PmcbWUS',1);

-- Three clinic owners, with password "clinic_owner"
INSERT INTO authorities(id,authority) VALUES (2,'CLINIC_OWNER');
INSERT INTO appusers(id,username,password,authority) VALUES (2,'clinicOwner1','$2a$10$t.I/C4cjUdUWzqlFlSddLeh9SbZ6d8wR7mdbeIRghT355/KRKZPAi',2);
INSERT INTO appusers(id,username,password,authority) VALUES (3,'clinicOwner2','$2a$10$t.I/C4cjUdUWzqlFlSddLeh9SbZ6d8wR7mdbeIRghT355/KRKZPAi',2);

INSERT INTO clinic_owners(id,first_name,last_name,user_id) VALUES (1, 'John', 'Doe', 2);
INSERT INTO clinic_owners(id,first_name,last_name,user_id) VALUES (2, 'Jane', 'Doe', 3);

INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (1, 'Clinic 1', 'Av. Palmera, 26', '955684230', 'PLATINUM', 1);
INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (2, 'Clinic 2', 'Av. Torneo, 52', '955634232', 'GOLD', 2);
INSERT INTO clinics(id, name, address, telephone, plan, clinic_owner) VALUES (3, 'Clinic 3', 'Av. Reina Mercedes, 70', '955382238', 'BASIC', 2);

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

