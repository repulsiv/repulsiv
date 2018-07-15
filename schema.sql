DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName varchar(10) NOT NULL,
  email varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  itemId int NOT NULL,
  productName varchar(100) NOT NULL,
  salesPrice int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users_products (
  id int NOT NULL AUTO_INCREMENT,
  id_users int NOT NULL,
  id_products int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id_users) REFERENCES users(id),
  FOREIGN KEY (id_products) REFERENCES products(id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


/*  Testing the database
-- INSERT INTO users (`id`, `userName`, `token`, `email`)
-- VALUES
--   (1, 'Shaital', 'mango', 'mango@gmail.com'),
--   (2, 'Nasa', 'raspberry', 'raspberry@gmail.com'),
--   (3, 'Khizra', 'watermelon', 'watermelon@gmail.com'),
--     (4, 'Lukas', 'apple', 'apple@gmail.com')
-- ;

-- INSERT INTO products (`id`, `itemID`, `productName`, `salesPrice`)
-- VALUES
--   (1, 1234, 'iPad', 10),
--   (2, 2345, 'iWatch', 11),
--   (3, 3456, 'iPhone', 12),
--     (4, 4567, 'iMac', 13)
-- ;

-- INSERT INTO users_products (`id`, `id_users`, `id_products`)
-- VALUES
--     (1, 1, 2),
--     (2, 2, 3),
--     (3, 3, 4),
--     (4, 4, 1)
-- ;
*/
