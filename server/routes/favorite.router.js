const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const sql = `
    SELECT * FROM favorite;
  `;

  pool.query(sql)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(err => {
      console.error('GET /favs error', err);
      res.sendStatus(500);
    })
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

router.get('/:favId', (req, res) => {
  const sql = `
    SELECT 
      favorite.*,
      json_agg(category) as categories
    FROM favorite
    LEFT JOIN favorite_category
      ON favorite_category.favorite_id = favorite.id
    LEFT JOIN category
      ON favorite_category.category_id = category.id
    WHERE favorite.id = $1
    GROUP BY favorite.id;
  `;
  pool.query(sql, [req.params.favId])
    .then(dbRes => {
      // Send back the first item in the array
      res.send(dbRes.rows[0]);
    })
  /* 
  {
    id: 2,
    title: 'Bebop with Charlie Parker',
    url: 'asdf.gif',
    categories: [
      {id: 1, name: 'meme'},
      {id: 3, name: 'funny'}
    ]
  }
  
  */
})

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  const sql = `
    INSERT INTO favorite_category
      (favorite_id, category_id)
    VALUES ($1, $2)
  `;
  const sqlParams = [req.params.favId, req.body.categoryId];

  pool.query(sql, sqlParams)
    .then(dbRes => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error('PUT /favs error', req.params.favId, err);
      res.sendStatus(500);
    })
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
