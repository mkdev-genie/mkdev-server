const express = require('express');

const router = express.Router();
const pool = require('../models/DbConnection');

router.post('', async (req, res) => {
  try {
    const { result: typeId, isUser } = req.body;
    if (!typeId || !Number(typeId) || Number(typeId) > 12 || Number(typeId) < 1) {
      return res.status(406).json({ message: 'wrong type id' });
    }
    // results 테이블에 저장
    if (typeof(isUser) !== 'boolean') {
      return res.status(406).json({ message: 'wrong isUser'});
    }
    if (isUser) {
      await pool.query(`INSERT INTO results(typeId) VALUES(${typeId})`);
    }

    // 결과 정보 반환
    const [[typesResult]] = await pool.query(
      `SELECT typeId, summary, nameKR, nameEN, quoteKR, quoteEN FROM types WHERE typeId=${typeId}`,
    );
    let [descriptions] = await pool.query(
      `SELECT description FROM descriptions WHERE typeId=${typeId}`,
    );
    descriptions = descriptions.map((desc) => desc.description);

    const result = {
      ...typesResult,
      descriptions,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
