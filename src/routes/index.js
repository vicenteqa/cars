const { Router } = require('express');
const router = Router();
const getAllCarData = require('../scraper').getAllCarData;

router.post('/cardata', function (req, res) {
	const urlToScrape = req.body.url;
	getAllCarData(urlToScrape).then((carData) => res.json(carData));
});

module.exports = router;
