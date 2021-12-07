const axios = require('axios');
const cheerio = require('cheerio');
const carPO = require('./pageObject/carPO').default;

async function getData(url) {
	const { data } = await axios.get(url);
	return cheerio.load(data);
}

async function getRawCarPrice(url) {
	const $ = await getData(url);
	return $(carPO.carPriceLabel).html();
}

async function getFormatedCarPrice(url) {
	const rawPrice = await getRawCarPrice(url);
	return rawPrice.split('&')[0] + '€';
}

exports.getFormatedCarPrice = (url) => getFormatedCarPrice(url);
