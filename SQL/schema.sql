-- CREATE DATABASE chat;

USE chat;


/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  /* Describe your table here.*/
  username VARCHAR(50),
  ID int NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  user_id INT NOT NULL,
  roomname VARCHAR(50),
  createdAt TIMESTAMP NOT NULL,
  message VARCHAR(300),
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id)
    REFERENCES users(ID)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




