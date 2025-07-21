const express = require("express");
const router = express.Router();

const liquorController = require("../controllers/liquor.controller");

// Multer + Cloudinary Storage
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/clodinary"); // typo kamu: clodinary → cloudinary

// Import middleware auth (proteksi JWT)
const auth = require("../middleware/auth");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "liquor-products",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage: storage });

// GET routes (public)
router.get("/", liquorController.getAll);
router.get("/:id", liquorController.getById);

// POST, PUT, DELETE (admin only, pakai auth)
router.post("/", auth, upload.single("gambar"), liquorController.create);
router.put("/:id", auth, upload.single("gambar"), liquorController.update);
router.delete("/:id", auth, liquorController.delete);

module.exports = router;
