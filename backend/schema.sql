CREATE DATABASE my_demon_list;
USE my_demon_list;

CREATE TABLE demons (
  demon_no int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  levelID int NOT NULL,
  name varchar(20) NOT NULL,
  difficulty varchar(20) NOT NULL,
  creator varchar(25) NOT NULL,
  status varchar(20) NOT NULL,
  progress int NOT NULL,
  comments varchar(255) DEFAULT NULL,
  PRIMARY KEY (demon_no),
  KEY user_id_idx (user_id),
  CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE users (
    user_id integer AUTO_INCREMENT PRIMARY KEY
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);