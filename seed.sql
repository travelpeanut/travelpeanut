INSERT INTO USERS (username, password, first_name, last_name, email) VALUES ('ryan', 'ryan', 'ryan', 'ryan', 'schabel12@gmail.com');
INSERT INTO USERS (username, password, first_name, last_name, email) VALUES ('heidi', 'heidi', 'heidi', 'heidi', 'heidixpoon@gmail.com');
INSERT INTO USERS (username, password, first_name, last_name, email) VALUES ('david', 'david', 'david', 'david', 'david@gmail.com');


INSERT INTO TRIPS (title, city, province, country, start_date, end_date, owner_id) VALUES ('RYAN IS GOING HOME', 'San Jose', 'CA', 'USA', '2018-05-04', '2019-05-05', 1);
INSERT INTO TRIPS (title, city, country, start_date, end_date, owner_id) VALUES ('HEIDI IS GOING SINGAPORE', 'Singapore', 'Singapore', '2018-05-04', '2019-05-18', 2);

insert into users_trips (user_id, trip_id) values (1, 1);
insert into users_trips (user_id, trip_id) values (1, 2);
insert into users_trips (user_id, trip_id) values (2, 2);

--select users.username, trips.city, activities.start_date, activities.start_time, activities.description from users 
--inner join users_trips on users.id = users_trips.user_id
--inner join trips on users_trips.trip_id = trips.id
--inner join activities on activities.trip_id = trips.id;

insert into activities (trip_id, description, start_date, start_time) values (1, 'get in-n-out', '2018-05-04', '1:00PM');
insert into activities (trip_id, description, start_date, start_time) values (2, 'get laksa', '2018-05-08', '11:00AM');


insert into comments (user_id, trip_id, activity_id, comments) values (1, 1, 1, 'bring an umbrella. i heard it is going to rain');
insert into comments (user_id, trip_id, activity_id, comments) values (2, 2, 2, 'let us uber there. i heard it is going to rain');

--select * from comments as c
--inner join users on users.id = c.user_id
--inner join trips on trips.id = c.trip_id;


insert into chats (date_time, user_id, message, trip_id) values ('2018-04-12 5:30PM', 2, 'our trip is going to be MUCHO LITTTT', 2);
insert into chats (date_time, user_id, message, trip_id) values ('2018-04-12 6:11PM', 1, 'YESSSSSSSSS', 2);


--select * from chats as c
--inner join users on users.id = c.user_id;

insert into invitations (owner_id, trip_id, user_id) values (1, 2, 3);