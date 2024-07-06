const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getAuditLogs, getAuditLogsPaginated} = require("../controllers/auditlog.controller");

router.route("/")
      .get(protect,getAuditLogsPaginated)

router.route("/latest")
      .get(protect,getAuditLogs)


module.exports = router;