const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Tambahkan ini untuk auth routes ===
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
// ========================================

const liquorRoutes = require("./routes/liquor.routes");
app.use("/api/liquors", liquorRoutes);

app.get("/", (req, res) => {
  res.send("API Liquor CRUD with Cloudinary ready!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
