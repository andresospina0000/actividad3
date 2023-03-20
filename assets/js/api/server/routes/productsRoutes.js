
const express = require('express');
const router = express.Router();
const products = require("../controllers/productsController");

router.get("/products", products.getAll);
router.post("/products", products.create);
router.put("/products/:id", products.update);
router.get("/products/:id", products.getOne);
router.delete("/products/:id", products.delete);

module.exports = router;