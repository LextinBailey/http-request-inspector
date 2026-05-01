const express = require("express");
const router = express.Router();

const { handleRequest, getRequests } = require("../controllers/requestController");

router.post("/requests", handleRequest);
router.get("/requests", getRequests);

module.exports = router;