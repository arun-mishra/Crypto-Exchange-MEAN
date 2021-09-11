const express = require("express");

const router = express.Router();

const exchangeController = require("../controllers/exchange");

router.post("/postExchange", exchangeController.postExchange);

router.get("/getExchange", exchangeController.getExchange);

router.get("/searchExchange", exchangeController.searchExchange);

module.exports = router;
