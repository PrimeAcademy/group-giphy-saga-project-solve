const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
router.post('/', (req, res) => {
  const sql = `
    INSERT INTO favorite
      (image_url, title)
    VALUES ($1, $2);
  `;
  const sqlParams = [req.body.image_url, req.body.title];

  pool.query(sql, sqlParams)
    .then(dbRes => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error('POST /favs error', err);
      res.sendStatus(500);
    })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
