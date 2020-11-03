/* eslint-disable no-param-reassign */
const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.get('', async (req, res) => {
  const questions = await pool.query('SELECT qid, content FROM questions');
  const questionsIter = questions[0];
  const result = await [...questionsIter].reduce(async (lastPromise, q) => {
    await lastPromise;
    const temp = await pool.query(
      `SELECT content, type1, type2, type3, type4, type5 FROM choices WHERE qid=${q.qid}`,
    );
    // eslint-disable-next-line prefer-destructuring
    q.choices = temp[0];
    return q;
  }, Promise.resolve());
  res.status(200).json({ result });
});

module.exports = router;
