const express = require('express');
const axios = require('axios');

const router = new express.Router();

// GET all the info for 1 singe Favorite, including its categories
router.get('/singleFavorite/:id', (req, res) =>{
    /*
    const queryText = `SELECT * FROM favorite
JOIN favorite_category ON favorite.id = favorite_category.favorite_id
JOIN category ON category.id = favorite_category.category_id
WHERE favorite.id = ${req.params.id}`;
*/
})


router.get('/:searchTerm', (req, res) => {
  // axios request to the giphy api
  console.log('search query is', req.params.searchTerm);

  // name=value&name=value
  let query = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.params.searchTerm}&limit=10&rating=pg`;
  axios
    .get(query)
    .then((apiRes) => {
      let dataToSend = apiRes.data.data.map((item) => {
        return {
          image_url: item.images.downsized.url,
          title: item.title,
        };
      });
      res.send(dataToSend);
    })
    .catch((err) => {
      if (err.response) {
        console.error('giphy api err', err.response.data);
      } else {
        console.log('giphy api err', err);
      }
      res.sendStatus(500);
    });
});

module.exports = router;