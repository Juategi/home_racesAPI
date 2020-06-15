INSERT INTO users (id, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a1','Pepe', 'Lopez', 'prueba@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Alicante', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a2','Pepa', 'Garcia', 'prueba2@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Alicante', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a3','Juan', 'Tena', 'prueba3@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Valencia', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a4','Sara', 'Martinez', 'prueba4@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'E', 'Castellon', CURRENT_DATE, LOCALTIME);


INSERT INTO competition (name, image, eventdate, eventtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone) VALUES ("A por todas!", "https://medicaloptica.es/blog/wp-content/uploads/2019/06/Audifonos-y-deporte-Medical-Optica-1024x683.jpeg", '2020-08-13', '10:30:00', '2020-08-10', '10:00:00', 'Public', 'Carrera', 'Valencia', 15.0, 30, '30€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular');
INSERT INTO competition (name, image, eventdate, eventtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone) VALUES ("Prueba definitiva!", "https://www.uv.es/recursos/fatwirepub/ccurl/625/806/deportes.png", '2020-09-15', '11:30:00', '2020-09-10', '10:00:00', 'Public', 'Bici', 'Valencia', 0.0, 50, '10€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular');

INSERT INTO competitors (userid , competitionid, ip, iplocalization, favorite, shared, paid, address, indate, intime) VALUES ('a2', 1 , '0.0.0.0' , '{}', 'F', 0, 'P', 'C/ Prueba 65', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, favorite, shared, paid, address, indate, intime) VALUES ('a3', 1 , '0.0.0.0' , '{}', 'F', 0, 'N', 'C/ Prueba 66', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, favorite, shared, paid, address, indate, intime) VALUES ('a1', 2 , '0.0.0.0' , '{}', 'F', 0, 'P', 'C/ Prueba 68', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, favorite, shared, paid, address, indate, intime) VALUES ('a4', 2 , '0.0.0.0' , '{}', 'F', 0, 'P', 'C/ Prueba 70', CURRENT_DATE, LOCALTIME);

INSERT INTO organizer (userid, competitionid, ip, iplocalization, createdate, createtime) VALUES ('a1', 1, '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);
INSERT INTO organizer (userid, competitionid, ip, iplocalization, createdate, createtime) VALUES ('a2', 2, '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);


