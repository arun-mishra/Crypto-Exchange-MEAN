const express = require("express");

const router = express.Router();

router.use("/exchange", require("./exchange"));

module.exports = router;
