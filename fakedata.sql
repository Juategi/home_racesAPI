INSERT INTO users (id, username, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a1','A1','Pepe', 'Lopez', 'prueba@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Alicante', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id,username, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a2','A2','Pepa', 'Garcia', 'prueba2@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Alicante', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id,username, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a3','A3','Juan', 'Tena', 'prueba3@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'G', 'Valencia', CURRENT_DATE, LOCALTIME);
INSERT INTO users (id,username, firstname, lastname, email, device, ip, iplocalization, service, locality, registerdate, registertime) VALUES ('a4','A4','Sara', 'Martinez', 'prueba4@gmail.com', 'ANDROID', '0.0.0.0', '{}', 'E', 'Castellon', CURRENT_DATE, LOCALTIME);


INSERT INTO competition (name, image, eventdate, eventtime, enddate, endtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone) VALUES ('A por todas!', 'https://medicaloptica.es/blog/wp-content/uploads/2019/06/Audifonos-y-deporte-Medical-Optica-1024x683.jpeg', '2020-08-13', '10:30:00', '2020-08-10', '10:00:00', 'Public', 'Carrera', 'Valencia', 15.0, 30, '30€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular');

INSERT INTO competition (name, image, eventdate, eventtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone) VALUES ('Prueba definitiva!', 'https://www.uv.es/recursos/fatwirepub/ccurl/625/806/deportes.png', '2020-09-15', '11:30:00', '2020-09-10', '10:00:00', 'Public', 'Bici', 'Valencia', 0.0, 50, '10€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular');
INSERT INTO competition (name, image, eventdate, eventtime, enddate, endtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone, distance) VALUES ('Prueba antigua!', 'https://www.uv.es/recursos/fatwirepub/ccurl/625/806/deportes.png', '2019-09-15', '11:30:00', '2019-09-16', '11:30:00', '2019-09-10', '10:00:00', 'Public', 'Bici', 'Valencia', 0.0, 50, '10€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular', 5);
INSERT INTO competition (name, image, eventdate, eventtime, maxdate, maxtime, type, modality, locality, price, capacity, rewards, promoted, observations, timezone) VALUES ('Prueba solo favorita!', 'https://img.freepik.com/foto-gratis/hombre-asiatico-ciclismo-carretera-manana_46139-75.jpg?size=626&ext=jpg', '2018-08-15', '11:30:00', '2018-08-10', '10:00:00', 'Public', 'Bici', 'Valencia', 0.0, 50, '10€ de descuento en tiendas', 'P', 'Observaciones aqui', 'Hora Peninsular');

INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('a2', 1 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 65', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('a3', 1 , '0.0.0.0' , '{}', 0, 'N', 'C/ Prueba 66', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('a1', 2 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 68', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('a4', 2 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 70', CURRENT_DATE, LOCALTIME);

INSERT INTO organizer (userid, competitionid, ip, iplocalization, createdate, createtime) VALUES ('a1', 1, '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);
INSERT INTO organizer (userid, competitionid, ip, iplocalization, createdate, createtime) VALUES ('a2', 2, '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);

INSERT INTO favorites(userid, competitionid) VALUES ('a1',1);
INSERT INTO favorites(userid, competitionid) VALUES ('a1',2);


INSERT INTO favorites(userid, competitionid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3',1);
INSERT INTO favorites(userid, competitionid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3',4);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 1 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 70', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 2 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 70', CURRENT_DATE, LOCALTIME);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 3 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 70', CURRENT_DATE, LOCALTIME);

INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, indate, intime) VALUES ('a1', 32 , '0.0.0.0' , '{}', 0, CURRENT_DATE, LOCALTIME);


INSERT INTO favorites(userid, competitionid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3',4);
INSERT INTO competitors (userid , competitionid, ip, iplocalization, shared, paid, address, indate, intime) VALUES ('iZPRzOkWDdWuD6IUl6spL4IJXyC2', 1 , '0.0.0.0' , '{}', 0, 'P', 'C/ Prueba 65', CURRENT_DATE, LOCALTIME);

INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 1, 'Comentario de prueba 1', '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);
INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime) VALUES ('a2', 1, 'Comentario de prueba 2', '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);
INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime) VALUES ('a1', 1, 'Comentario de prueba 3', '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME);

INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime, parentid) VALUES ('a2', 1, 'Comentario de prueba 2', '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME, 1);

INSERT INTO comment(userid, competitionid, comment, ip, iplocalization, commentdate, commenttime, parentid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 1, 'Comentario de respuesta 2', '0.0.0.0', '{}', CURRENT_DATE, LOCALTIME, 2);


INSERT INTO notification (userid,message,competitionid,ndate,ntime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 'a1', 1, CURRENT_DATE, LOCALTIME);
INSERT INTO notification (userid,message,competitionid,ndate,ntime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 'a2', 1, CURRENT_DATE, LOCALTIME);
INSERT INTO notification (userid,message,competitionid,ndate,ntime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 'a3', 1, CURRENT_DATE, LOCALTIME);
INSERT INTO notification (userid,message,competitionid,ndate,ntime) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 'a4', 1, CURRENT_DATE, LOCALTIME);

insert into followers(userid,followerid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3','a1');
insert into followers(userid,followerid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3','a2');
insert into followers(userid,followerid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3','a3');
insert into followers(userid,followerid) VALUES ('a4','MuOh2S1rUxM58eLsGgqDKb3Lm0E3');

insert into followers(userid,followerid) VALUES ('iZPRzOkWDdWuD6IUl6spL4IJXyC2','a1');
insert into followers(userid,followerid) VALUES ('iZPRzOkWDdWuD6IUl6spL4IJXyC2','a2');
insert into followers(userid,followerid) VALUES ('iZPRzOkWDdWuD6IUl6spL4IJXyC2','a3');
insert into followers(userid,followerid) VALUES ('a4','iZPRzOkWDdWuD6IUl6spL4IJXyC2');

insert into followers(userid,followerid) VALUES ('iZPRzOkWDdWuD6IUl6spL4IJXyC2','MuOh2S1rUxM58eLsGgqDKb3Lm0E3');
insert into followers(userid,followerid) VALUES ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3','iZPRzOkWDdWuD6IUl6spL4IJXyC2');

insert into racedata (userid, competitionid, time, distance, steps, partials) values ('MuOh2S1rUxM58eLsGgqDKb3Lm0E3', 28, 3000, 21, 40000, '{"1":70 , "2":68, "3":86, "4":75, "5":88, "6":91, "7":"93", "8":"96", "9":98, "10":100}');
insert into racedata (userid, competitionid, time, distance, steps, partials) values ('a1', 28, 3500, 21, 41000, '{}');
insert into racedata (userid, competitionid, time, distance, steps, partials) values ('a2', 28, 3300, 21, 40500, '{}');
insert into racedata (userid, competitionid, time, distance, steps, partials) values ('a3', 28, 3300, 21, 40504, '{}');

