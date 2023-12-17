const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController'); 

// Define routes
router.get('/data', UserController.data);
router.get('/keranjang', UserController.keranjang);
router.post('/masukkeranjang', UserController.masukkeranjang);

// Export the router
module.exports = router;
