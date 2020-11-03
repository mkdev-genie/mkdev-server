const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.post('', async (req, res) => {
  const { type1, type2, type3, type4, type5 } = req.body;
  const values = [type1, type2, type3, type4, type5];
  if (values.filter((v) => v === undefined).length > 0) {
    return res.status(406).json({ message: 'missing value' });
  }
  const result = await pool.query(
    'INSERT INTO results(type1, type2, type3, type4, type5) VALUES(?, ?, ?, ?, ?)',
    [type1, type2, type3, type4, type5],
  );
  const { insertId } = result[0];
  res.json({ id: insertId });
});

module.exports = router;
