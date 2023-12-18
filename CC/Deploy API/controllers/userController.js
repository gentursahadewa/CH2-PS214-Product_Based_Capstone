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

  const { sessionid } = req.params;
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

  const { idbarang, sessionid, nama, harga, gambar, catatan} = req.body;
  const insertQuery = 'INSERT INTO keranjang (idbarang, sessionid, nama, harga, gambar, catatan) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [idbarang, sessionid, nama, harga, gambar, catatan], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      // Mengirim hasil kueri sebagai respons
      res.status(200).json({ Message: 'Input Berhasil' });
    }
  });
};

const hapusItemKeranjang = (req, res) => {
  const { idkeranjang } = req.body; // Mengambil itemId dari parameter URL
  const deleteQuery = 'DELETE FROM keranjang WHERE idkeranjang = ?';

  connection.query(deleteQuery, [idkeranjang], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json({ Message: 'Item berhasil dihapus' });
    }
  });
};

const riwayat = (req, res) => {
  const { sessionid } = req.params;
  const query = 'SELECT * FROM riwayat WHERE sessionid = ?';

  connection.query(query, [sessionid], (error, results, fields) => {
    if (error) {
      console.error('Error querying database:', error);
      res.status(500).json({ Error: 'Internal Server Error' });
    } else {
      res.status(200).json(results);
    }
  });
};

const masukriwayat = (req, res) => {
  const { idkeranjang, idbarang, sessionid, nama, harga, gambar, catatan, totalharga, alamat } = req.body;
  const insertQuery = 'INSERT INTO riwayat (idkeranjang, idbarang, sessionid, nama, harga, gambar, catatan, totalharga, alamat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(insertQuery, [idkeranjang, idbarang, sessionid, nama, harga, gambar, catatan, totalharga, alamat], (error, results, fields) => {
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
  hapusItemKeranjang,
  riwayat,
  masukriwayat, 
};
