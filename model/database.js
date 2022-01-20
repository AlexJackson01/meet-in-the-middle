require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
    host: DB_HOST || "127.0.0.1",
    user: DB_USER || "root",
    password: DB_PASS,
    database: DB_NAME || "middle",
    multipleStatements: true
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    let sql =
        "DROP TABLE if exists favourites; CREATE TABLE favourites(id INT NOT NULL, name VARCHAR(100) not null, address VARCHAR(200) not null, point_one VARCHAR(50) not null, point_two VARCHAR(50) not null, rating INT not null, PRIMARY KEY (id));";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table creation `favourites` was successful!");

        console.log("Closing...");
    });

    "DROP TABLE if exists rating; CREATE TABLE rating(id INT NOT NULL, user_rating INT not null, user_recommendations VARCHAR(500) not null, PRIMARY KEY (id));";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Table creation `rating` was successful!");

        console.log("Closing...");
    });

    con.end();
});