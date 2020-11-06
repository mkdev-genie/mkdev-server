const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.get('', async (req, res) => {
  const [questions] = await pool.query('SELECT qid, content FROM questions');
  const result = questions.map(async (q) => {
    const [choices] = await pool.query(
      `SELECT content, type1, type2, type3, type4, type5 FROM choices WHERE qid=${q.qid}`,
    );
    return { ...q, choices };
  });
  const resolved = await Promise.all(result);
  res.status(200).json({ resolved });
});

module.exports = router;
