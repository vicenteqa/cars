const axios = require('axios');
const cheerio = require('cheerio');
const carPO = require('./pageObject/carPO').default;

async function getData(url) {
	const { data } = await axios.get(url);
	return cheerio.load(data);
}

async function getFormatedPrice($) {
	const rawPrice = $(carPO.carPriceLabel).html();
	return rawPrice.split('&')[0] + '€';
}

async function getFormatedAddress($) {
	const campoDireccion1 = $(carPO.address1).html();
	const campoDireccion2 = $(carPO.address2).html().split('i>')[1].split('&nbsp;');
	return campoDireccion1 + ', ' + campoDireccion2[0] + ', ' + campoDireccion2[1];
}

async function getFormatedPhoneNumbers($) {
	let phoneNumbers = $(carPO.phoneNumbers).html();
	phoneNumbers = phoneNumbers.replace('<i>', ' ');
	phoneNumbers = phoneNumbers.replace('<li>', ' ');
	phoneNumbers = phoneNumbers.replace('<li>', ' ');
	phoneNumbers = phoneNumbers.replace('<li>', ' ');
	phoneNumbers = phoneNumbers.replace('</li>', ' ');
	phoneNumbers = phoneNumbers.replace('</li>', ' ');
	return phoneNumbers.replace('</li>', ' ');
}

async function getDealerName($) {
	const dealer = $(carPO.dealer).html();
	return dealer.split('>')[1].split('</')[0];
}

async function getDealerSite($) {
	let dealer = $(carPO.dealer).html();
	dealer = dealer.split('href')[1].split('target=')[0];
	dealer = dealer.replace('"', '');
	dealer = dealer.replace('" ', '');
	return dealer.replace('=', '');
}

async function getAllCarData(url) {
	let carDataJson = {};
	const $ = await getData(url);
	carDataJson.dealerName = await getDealerName($);
	carDataJson.dealerSite = await getDealerSite($);
	carDataJson.model = $(carPO.carModel).html();
	carDataJson.price = await getFormatedPrice($);
	carDataJson.address = await getFormatedAddress($);
	carDataJson.phoneNumbers = await getFormatedPhoneNumbers($);
	return carDataJson;
}

exports.getAllCarData = (url) => getAllCarData(url);
