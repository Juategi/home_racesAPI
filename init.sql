create table users(id varchar(100) unique primary key, username varchar(100) not null, firstname varchar(100) not null, lastname varchar(100) not null, image text, locality varchar(100), sex character, birthdate date, email unique varchar(100) not null, password varchar(100), registerdate date not null, registertime time not null, service varchar(20) not null, device varchar(100) not null, ip varchar(50) not null, iplocalization text, facebooklinked character, apprated character, weight real, height real);

create table competition(id serial primary key, image text not null, name varchar(200) not null, eventdate date not null, eventtime time not null, maxdate date not null, maxtime time not null, type varchar(150) not null, modality varchar(150) not null, locality varchar(100) not null, price real not null, capacity integer not null, rewards text not null, promoted character not null, observations text, timezone varchar(20));

create table comment(id serial unique, userid varchar(100) not null, competitionid integer not null, comment text not null, commentdate date not null, commenttime time not null, ip varchar(50) not null, iplocalization text, primary key(id,userid,competitionid), CONSTRAINT user_comment_fkey FOREIGN KEY (userid) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT competition_comment_fkey FOREIGN KEY (competitionid) REFERENCES competition (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

create table competitors(userid varchar(100) not null, competitionid integer not null, indate date not null, intime time not null, ip varchar(50) not null, iplocalization text, shared integer not null, paid character not null, address text not null, primary key(userid,competitionid), CONSTRAINT user_id_fkey FOREIGN KEY (userid) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT competition_id_fkey FOREIGN KEY (competitionid) REFERENCES competition (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

create table organizer(userid varchar(100) not null, competitionid integer not null, createdate date not null, createtime time not null, ip varchar(50) not null, iplocalization text, primary key(userid,competitionid), CONSTRAINT user_id_fkey FOREIGN KEY (userid) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT competition_id_fkey FOREIGN KEY (competitionid) REFERENCES competition (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

create table report(id serial unique, userid varchar(100) not null, commentid integer not null, report text not null, primary key(id,userid,commentid), CONSTRAINT user_id_fkey FOREIGN KEY (userid) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT comment_id_fkey FOREIGN KEY (commentid) REFERENCES comment (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);

create table favorites(userid varchar(100) not null, competitionid integer not null, primary key(userid,competitionid), CONSTRAINT user_id_fkey FOREIGN KEY (userid) REFERENCES users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE, CONSTRAINT competition_id_fkey FOREIGN KEY (competitionid) REFERENCES competition (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE);
