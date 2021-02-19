const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.get('', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) AS count FROM results');
    res.status(200).json({ result: result[0][0].count });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
