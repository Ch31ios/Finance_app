const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


// DATABASE
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "finance"
});


// ROUTES
app.post("/register", (req, res) => {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err) => {
      if (err) {
        // Error de duplicado (código 1062 en MySQL)
        if (err.code === "ER_DUP_ENTRY") {
          return res.send({ error: "Email or username already registered" });
        }
        return res.send({ error: "A database error occurred." });
      }
      res.send({ success: true });
    }
  );

});

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send({ login: true });
      } else {
        res.send({ login: false });
      }
    }
  );

});


// SERVER
app.listen(3001, () => {
  console.log("Server is running");
});
