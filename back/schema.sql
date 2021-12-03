CREATE DATABASE racer_portfolio;
USE racer_portfolio;

CREATE TABLE User(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT,
    `image` TEXT,
    `type` INT NOT NULL
    );

CREATE TABLE Portfolio(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES User(`id`)

)

CREATE TABLE EduLevel(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `portfolio_id` INT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `major` VARCHAR(45) NOT NULL,
    `type` INT NOT NULL,
    FOREIGN KEY(`portfolio_id`) REFERENCES Portfolio(`id`)
);

CREATE TABLE Award(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `portfolio_id` INT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    FOREIGN KEY(`portfolio_id`) REFERENCES Portfolio(`id`)
);


CREATE TABLE Project(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `portfolio_id` INT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` TEXT NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `url` VARCHAR(100),
    FOREIGN KEY(`portfolio_id`) REFERENCES Portfolio(`id`)
    
);

CREATE TABLE Certificate(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `portfolio_id` INT NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `agency` VARCHAR(45) NOT NULL,
    `date` DATE NOT NULL,
    FOREIGN KEY(`portfolio_id`) REFERENCES Portfolio(`id`)
);