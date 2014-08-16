-- CREATE DATABASE chat;

USE test;

CREATE TABLE messageTable (
  /* Describe your table here.*/
  username VARCHAR(50),
  roomname VARCHAR(50),
  createdat DATE,
  message VARCHAR(300),
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




