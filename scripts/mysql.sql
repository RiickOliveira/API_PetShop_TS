CREATE SCHEMA `PetShop`;

CREATE TABLE `PetShop`.`product` (
    `id` INT NOT NULL,
    `title` VARCHAR(80) NULL,
    `description` TEXT(4000) NULL,
    PRIMARY KEY (`ID`)
);