CREATE DATABASE elice;
USE elice;

CREATE TABLE user(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(255),
    `image` VARCHAR(255)
    );


CREATE TABLE education(
    `edu_id` INT AUTO_INCREMENT PRIMARY KEY,
    `school` VARCHAR(45) NOT NULL,
    `major` VARCHAR(45) NOT NULL,
    `degree` VARCHAR(45) NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES user(`id`)
);

CREATE TABLE award(
    `award_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(45) NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES user(`id`)
);


CREATE TABLE project(
    `project_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `url` VARCHAR(255) NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES user(`id`)
    
);

CREATE TABLE license(
    `license_id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `agency` VARCHAR(20) NOT NULL,
    `date` DATE NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES user(`id`)
);