const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mesaj: "Hayvan Takip Sistemi API Çalışıyor" });
});

app.post("/api/konum-ekle", async (req, res) => {
  try {
    const { device_id, latitude, longitude, battery_mv } = req.body;

    if (!device_id || !latitude || !longitude) {
      return res.status(400).json({ hata: "Eksik veri gönderildi!" });
    }

    const yeniKonum = await pool.query(
      "INSERT INTO locations (device_id, latitude, longitude, battery_mv) VALUES ($1, $2, $3, $4) RETURNING *",
      [device_id, latitude, longitude, battery_mv],
    );

    console.log("Yeni konum kaydedildi:", device_id);
    res.status(201).json({
      mesaj: "Konum başarıyla kaydedildi ✅",
      veri: yeniKonum.rows[0],
    });
  } catch (err) {
    console.error("Kayıt Hatası:", err.message);
    res.status(500).json({ hata: "Sunucu hatası oluştu" });
  }
});

app.get("/api/son-konumlar", async (req, res) => {
  try {
    const guncelKonumlar = await pool.query(`
          SELECT DISTINCT ON (device_id) * 
          FROM locations 
          ORDER BY device_id, created_at DESC
      `);

    res.status(200).json(guncelKonumlar.rows);
  } catch (err) {
    console.error("Veri Çekme Hatası:", err.message);
    res.status(500).json({ hata: "Konumlar alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda ayaklandı.`);
});
