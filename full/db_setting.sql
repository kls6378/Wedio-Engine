CREATE DATABASE wedio;

USE wedio;

CREATE TABLE users(
    _id INT AUTO_INCREMENT PRIMARY KEY,
    id VARCHAR(32) NOT NULL,
    password VARCHAR(32) NOT NULL,
    nickname VARCHAR(32) NOT NULL
);