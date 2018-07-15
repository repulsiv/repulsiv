DROP DATABASE IF EXISTS greenfield;

CREATE DATABASE greenfield;

USE greenfield;

CREATE TABLE users (
  userId varchar(30) NOT NULL,
  email varchar(100) NOT NULL,
  username varchar(100) NOT NULL,
  PRIMARY KEY (userId)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

