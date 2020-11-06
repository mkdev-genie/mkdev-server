const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.get('', async (req, res) => {
  const result = await pool.query('SELECT COUNT(*) AS count FROM results');
  res.json({ result: result[0][0].count });
});

module.exports = router;
