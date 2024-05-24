IF EXISTS (SELECT * FROM information_schema.tables WHERE table_schema = 'posts' AND table_name = 'posts') BEGIN PRINT 'Table already exists. Skipping creation.'; END ELSE BEGIN USE posts;
CREATE DATABASE posts;

USE posts;

CREATE TABLE `courses` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`course_id`)
) ;

CREATE TABLE `user_course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`)
) ;

CREATE TABLE `removed_course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_course_id` int DEFAULT NULL,
  `available_date` DATE DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `removed_course_ibfk_1` FOREIGN KEY (`user_course_id`) REFERENCES `user_course` (`id`)
);

DELIMITER //

CREATE TRIGGER `set_available_date`
BEFORE INSERT ON `removed_course`
FOR EACH ROW
BEGIN
  SET NEW.available_date = DATE_ADD(NOW(), INTERVAL 1 YEAR);
END//

DELIMITER ;