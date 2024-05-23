DROP DATABASE IF EXISTS auth_user;

CREATE DATABASE auth_user;

USE auth_user;

CREATE TABLE `expired_token` (
  `token` varchar(255) NOT NULL
);
