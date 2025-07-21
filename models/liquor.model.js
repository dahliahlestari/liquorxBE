const db = require("../config/db");

// Ambil semua liquor
exports.getAll = (result) => {
  db.query("SELECT * FROM liquors", (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

// Ambil liquor by ID
exports.getById = (id, result) => {
  db.query("SELECT * FROM liquors WHERE id = ?", [id], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};

// Tambah liquor baru
exports.create = (data, result) => {
  // Pastikan semua data benar
  const diskon = Number(data.diskon) || 0;
  const rating = Number(data.rating) || 5.0;
  const sold = Number(data.sold) || 0;

  db.query(
    "INSERT INTO liquors (nama, harga, stok, deskripsi, kategori, diskon, gambar, rating, sold) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      data.nama,
      data.harga,
      data.stok,
      data.deskripsi,
      data.kategori,
      diskon,
      data.gambar,
      rating,
      sold,
    ],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// Update liquor
exports.update = (id, data, result) => {
  const diskon = Number(data.diskon) || 0;
  const rating = Number(data.rating) || 5.0;
  const sold = Number(data.sold) || 0;

  // Update gambar jika diupload baru, kalau tidak tetap pakai gambar lama
  db.query(
    "UPDATE liquors SET nama=?, harga=?, stok=?, deskripsi=?, kategori=?, diskon=?, gambar=?, rating=?, sold=? WHERE id=?",
    [
      data.nama,
      data.harga,
      data.stok,
      data.deskripsi,
      data.kategori,
      diskon,
      data.gambar,
      rating,
      sold,
      id,
    ],
    (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    }
  );
};

// Hapus liquor
exports.delete = (id, result) => {
  db.query("DELETE FROM liquors WHERE id=?", [id], (err, res) => {
    if (err) return result(err, null);
    result(null, res);
  });
};
