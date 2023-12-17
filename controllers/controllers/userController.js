const connection = require('../db/connection');

// Fungsi untuk rute /data
const data = (req, res) => {
  // Query untuk mengambil data dari tabel data_baju
  const query = 'SELECT * FROM databaju';

  // Melakukan kueri ke database yang sudah diimpor dari dbConnection.js
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Mengirim hasil kueri sebagai respons
      res.status(200).json(results);
    }
  });
};

const keranjang = (req, res) => {

  const { sessionid } = req.body;
  const query = 'SELECT * FROM keranjang WHERE sessionid = ?';

  // Melakukan kueri ke database yang sudah diimpor dari dbConnection.js
  connection.query(query, [sessionid], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Mengirim hasil kueri sebagai respons
      res.status(200).json(results);
    }
  });
};

const masukkeranjang = (req, res) => {

  const { idbarang, sessionid, nama, harga, gambar} = req.body;
  const insertQuery = 'INSERT INTO keranjang (idbarang, sessionid, nama, harga, gambar) VALUES (?, ?, ?, ?, ?)';
  connection.query(insertQuery, [idbarang, sessionid, nama, harga, gambar], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      // Mengirim hasil kueri sebagai respons
      res.status(200).json({ Message: 'Input Berhasil' });
    }
  });
};


// Ekspor fungsi data
module.exports = {
  data,
  keranjang,
  masukkeranjang,
};
