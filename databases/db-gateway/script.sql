IF EXISTS (SELECT * FROM information_schema.tables WHERE table_schema = 'auth_user' AND table_name = 'auth_user') BEGIN PRINT 'Table already exists. Skipping creation.'; END ELSE BEGIN USE auth_user;

CREATE DATABASE auth_user;

USE auth_user;

CREATE TABLE `expired_token` (
  `token` varchar(255) NOT NULL
);
