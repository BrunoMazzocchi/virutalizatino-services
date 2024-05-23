IF EXISTS (SELECT * FROM information_schema.tables WHERE table_schema = 'users' AND table_name = 'users') BEGIN PRINT 'Table already exists. Skipping creation.'; END ELSE BEGIN USE users;
CREATE DATABASE users;

USE users;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`name`)
);

CREATE TABLE `expired_token` (
  `token` varchar(255) NOT NULL
);

