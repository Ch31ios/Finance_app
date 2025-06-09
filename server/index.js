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

// REGISTER
app.post("/register", (req, res) => {
  const { email, username, password } = req.body;
  db.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, password],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.send({ error: "Email or username already registered" });
        }
        return res.send({ error: "A database error occurred." });
      }
      res.send({ success: true });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.send({ error: "A database error occurred." });
      if (result.length > 0) {
        res.send({ login: true, username: result[0].username });
      } else {
        res.send({ login: false });
      }
    }
  );
});

// GET USER BY USERNAME
app.post("/get-user", (req, res) => {
  const { username } = req.body;
  db.query(
    "SELECT id, username FROM users WHERE username = ?",
    [username],
    (err, result) => {
      if (err || result.length === 0) {
        return res.send({ error: "User not found" });
      }
      res.send({ id: result[0].id, username: result[0].username });
    }
  );
});

// CREATE TRANSACTION
app.post("/transaction", (req, res) => {
  const { user_id, username, amount, type, category } = req.body;
  db.query(
    "INSERT INTO transactions (user_id, username, amount, type, category) VALUES (?, ?, ?, ?, ?)",
    [user_id, username, amount, type, category],
    (err) => {
      if (err) return res.send({ error: "A database error occurred." });
      res.send({ success: true });
    }
  );
});

// TRANSACTIONS SUMMARY
app.post("/transactions-summary", (req, res) => {
  const { user_id } = req.body;
  db.query(
    `SELECT 
      SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
      SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
    FROM transactions
    WHERE user_id = ?`,
    [user_id],
    (err, result) => {
      if (err) return res.send({ error: "A database error occurred." });
      const income = result[0].total_income || 0;
      const expense = result[0].total_expense || 0;
      res.send({
        total_income: income,
        total_expense: expense,
        balance: income - expense
      });
    }
  );
});

// ADD CATEGORY
app.post("/add-category", (req, res) => {
  const { user_id, category } = req.body;
  db.query(
    "INSERT INTO categories (user_id, category) VALUES (?, ?)",
    [user_id, category],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.send({ error: "Category already exists" });
        }
        return res.send({ error: "A database error occurred." });
      }
      res.send({ success: true });
    }
  );
});

// GET CATEGORIES
app.post("/get-categories", (req, res) => {
  const { user_id } = req.body;
  db.query(
    "SELECT id, category FROM categories WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if (err) return res.send({ error: "A database error occurred." });
      res.send({ categories: result });
    }
  );
});

// DELETE CATEGORY
app.post("/delete-category", (req, res) => {
  const { id, user_id } = req.body;
  db.query(
    "DELETE FROM categories WHERE id = ? AND user_id = ?",
    [id, user_id],
    (err) => {
      if (err) return res.send({ error: "A database error occurred." });
      res.send({ success: true });
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running");
});
