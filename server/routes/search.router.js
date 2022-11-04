const express = require('express');
const axios = require('axios');

const router = new express.Router();

// GET /api/search/anime
router.get('/', (req, res) => {

    // axios request to the giphy api
    console.log('search query is', req.query.query);

    axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
            api_key: process.env.GIPHY_API_KEY,
            q: req.query.query,
            limit: 10,
            rating: 'pg'
        }
    })
        .then(apiRes => {
            let dataToSend = apiRes.data.data.map(item => {
                return {
                    image_url: item.images.downsized.url,
                    title: item.title
                };
            });
            res.send(dataToSend);
        })
        .catch(err => {
            if (err.response) {
                console.error('giphy api err', err.response.data);
            }
            else {
                console.log('giphy api err', err);
            }
            res.sendStatus(500);
        });
});

module.exports = router;