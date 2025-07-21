const Liquor = require("../models/liquor.model");

// Ambil semua data liquor
exports.getAll = (req, res) => {
  Liquor.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Ambil data liquor by ID
exports.getById = (req, res) => {
  Liquor.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Not found" });
    res.json(results[0]);
  });
};

// Buat produk baru
exports.create = (req, res) => {
  const { nama, harga, stok, deskripsi, kategori, diskon, rating, sold } =
    req.body;
  const gambar = req.file ? req.file.path : null;

  if (!nama || !harga || !stok) {
    return res.status(400).json({ error: "Field required: nama, harga, stok" });
  }

  const diskonPersen = Number(diskon) || 0;
  const ratingValue = Number(rating) || 5.0;
  const soldValue = Number(sold) || 0;

  Liquor.create(
    {
      nama,
      harga,
      stok,
      deskripsi,
      kategori,
      diskon: diskonPersen,
      gambar,
      rating: ratingValue,
      sold: soldValue,
    },
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({
        message: "Produk berhasil ditambahkan!",
        id: result.insertId,
      });
    }
  );
};

// Update produk (gambar tidak hilang jika tidak upload baru)
exports.update = (req, res) => {
  const { nama, harga, stok, deskripsi, kategori, diskon, rating, sold } =
    req.body;
  const diskonPersen = Number(diskon) || 0;
  const ratingValue = Number(rating) || 5.0;
  const soldValue = Number(sold) || 0;

  // Ambil dulu data lama untuk dapat gambar lama
  Liquor.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results || results.length === 0)
      return res.status(404).json({ error: "Produk tidak ditemukan" });

    const oldData = results[0];
    // Jika tidak upload file, pakai gambar lama!
    const gambar = req.file ? req.file.path : oldData.gambar;

    Liquor.update(
      req.params.id,
      {
        nama,
        harga,
        stok,
        deskripsi,
        kategori,
        diskon: diskonPersen,
        gambar,
        rating: ratingValue,
        sold: soldValue,
      },
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Produk berhasil diupdate!" });
      }
    );
  });
};

// Hapus produk
exports.delete = (req, res) => {
  Liquor.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Produk berhasil dihapus!" });
  });
};
