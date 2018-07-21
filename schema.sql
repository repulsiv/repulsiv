DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  token varchar(255) NOT NULL UNIQUE,
  userName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  itemId int NOT NULL,
  productName text NOT NULL,
  salesPrice int NOT NULL,
  threshHoldPrice int NOT NULL,
  created_at timestamp NOT NULL,
  user_id int NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

/*
CREATE TABLE users_products (
  id_users int NOT NULL,
  id_products int NOT NULL,
  PRIMARY KEY (id_users, id_products),
  FOREIGN KEY (id_users) REFERENCES users(id),
  FOREIGN KEY (id_products) REFERENCES products(id)
);
*/

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/


/*  Testing the database
INSERT INTO users (userName, email) VALUES
  ('Shaital', 'mango@gmail.com'),
  (2, 'Nasa', 'raspberry', 'raspberry@gmail.com'),
  (3, 'Khizra', 'watermelon', 'watermelon@gmail.com'),
    (4, 'Lukas', 'apple', 'apple@gmail.com')
;

-- INSERT INTO products (itemID, productName, salesPrice, threshHoldPrice) VALUES
--   (1234, 'iPad', 20, 10),
--   (2, 2345, 'iWatch', 11),
--   (3, 3456, 'iPhone', 12),
--     (4, 4567, 'iMac', 13)
-- ;

INSERT INTO users (token, userName, email) VALUES (12345, 'Shaital', 'mango@gmail.com');
INSERT INTO products (itemID, productName, salesPrice, threshHoldPrice) VALUES (1234, 'iPad', 20, 10);

INSERT INTO users_products (id_users, id_products) SELECT users.id, products.id FROM users INNER JOIN products ON users.id = products.id;

-- INSERT INTO users_products (`id`, `id_users`, `id_products`)
-- VALUES
--     (1, 1, 2),
--     (2, 2, 3),
--     (3, 3, 4),
--     (4, 4, 1)
-- ;
