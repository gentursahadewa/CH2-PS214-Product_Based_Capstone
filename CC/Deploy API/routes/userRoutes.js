const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); 

// Define routes
router.get('/data', UserController.data);
router.get('/keranjang/:sessionid', UserController.keranjang);
router.post('/masukkeranjang', UserController.masukkeranjang);
router.delete('/hapusItemKeranjang', UserController.hapusItemKeranjang);
router.get('/riwayat/:sessionid', UserController.riwayat);
router.post('/masukriwayat', UserController.masukriwayat);

// Export the router
module.exports = router;
