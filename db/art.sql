--  mysql table stucture

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone= "+00:00";

-- table structure for table `config`

CREATE TABLE `info` (
    `id` int(255) NOT NULL AUTO_INCREMENT,
    `form` TEXT(455),
    `name` TEXT(455),
    `artist` TEXT(455),
    `year` INT,
    `image` TEXT(4555)
) 

INSERT INTO info(form,name,artist,year,image) VALUES ('','','',0,'');

