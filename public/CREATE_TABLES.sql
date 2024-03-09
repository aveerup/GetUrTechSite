CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256),
    base_price NUMERIC(7, 0) NOT NULL, 
    discount NUMERIC(5, 2), 
    rating NUMERIC(3, 1) DEFAULT 0.0, 
    category VARCHAR(32),
    subcategory VARCHAR(32),
    brand VARCHAR(32),
    stock INT
);

CREATE TABLE images (
    product_id INT, 
    img_url VARCHAR(256) NOT NULL, 
    PRIMARY KEY(product_id, img_url),
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(256), 
    last_name VARCHAR(256), 
    email VARCHAR(256) UNIQUE, 
    pass_word VARCHAR(256), 
    phone_number VARCHAR(256),
    user_address VARCHAR(256), 
    role VARCHAR(256)
);

CREATE TABLE review (
    review_id SERIAL PRIMARY KEY,
    product_id INT,
    user_id INT,
    rating INT,
    text VARCHAR(256),
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY, 
    product_id INT,
    comment_on INT,
    user_id INT,
    text VARCHAR(256),
    comment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY(comment_on) REFERENCES comments(comment_id) ON DELETE CASCADE
);

CREATE TABLE log (
    time DATE,
    type VARCHAR(256),
    id INT
);

CREATE TABLE purchase (
    purchase_id SERIAL PRIMARY KEY, 
    purchase_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    approval_date TIMESTAMPTZ DEFAULT NULL, 
    payment_info VARCHAR(256), 
    address VARCHAR(256), 
    bought_by INT,
    FOREIGN KEY(bought_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE cart (
    user_id INT,
    product_id INT,
    product_count INT,
    PRIMARY KEY(user_id, product_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE purchase_product (
    purchase_id INT,
    product_id INT,
    product_count INT,
    PRIMARY KEY(purchase_id, product_id),
    FOREIGN KEY(purchase_id) REFERENCES purchase(purchase_id) ON DELETE CASCADE,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE spec_table (
    attr_name VARCHAR(50) NOT NULL,
    attr_value VARCHAR(200), 
    product_id INT NOT NULL,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY(attr_name, product_id)
);

CREATE TABLE user_notification (
    user_id INTEGER,
    message VARCHAR(256),
    receive_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

