const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

const QUESTION_COUNT = 12;

router.get('', async (req, res) => {
  try {
    const [questions] = await pool.query('SELECT qid, content FROM questions');
    const result = questions.map(async (q) => {
      const [choices] = await pool.query(
        `SELECT content, ${new Array(QUESTION_COUNT)
          .fill('type')
          .map((type, i) => `${type}${i + 1}`)
          .join(', ')} FROM choices WHERE qid=${q.qid}`,
      );
      return { ...q, choices };
    });
    const resolved = await Promise.all(result);
    res.status(200).json({ resolved });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
