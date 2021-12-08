const { Router } = require('express');
const router = Router();
const getAllCarData = require('../scraper').getAllCarData;

router.post('/cardata', function (req, res) {
	getAllCarData(req.body.url).then((carData) => res.json(carData));
});

module.exports = router;
