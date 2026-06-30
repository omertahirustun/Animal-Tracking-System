const { Pool } = require("pg");
require("dotenv").config();

console.log(
  "Okunan URL:",
  process.env.DATABASE_URL
    ? "URL Başarıyla Okundu!"
    : "URL BULUNAMADI (UNDEFINED)!",
);

if (!process.env.DATABASE_URL) {
  console.error(
    "KRİTİK HATA: .env dosyası okunamıyor veya DATABASE_URL değişkeni yok!",
  );
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Veritabanına bağlanılamadı ❌", err.stack);
  } else {
    console.log("PostgreSQL Veritabanına Başarıyla Bağlanıldı ✅");
    release();
  }
});

module.exports = pool;
