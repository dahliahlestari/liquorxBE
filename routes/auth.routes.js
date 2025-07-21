const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM admins WHERE username = ?",
    [username],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(401).json({ error: "User not found" });

      const admin = results[0];
      bcrypt.compare(password, admin.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err });
        if (!isMatch) return res.status(401).json({ error: "Wrong password" });

        // Generate JWT
        const token = jwt.sign(
          { id: admin.id, username: admin.username },
          process.env.JWT_SECRET,
          { expiresIn: "8h" }
        );
        res.json({ token, username: admin.username });
      });
    }
  );
});

module.exports = router;
