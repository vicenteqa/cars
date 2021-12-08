const axios = require('axios');
const cheerio = require('cheerio');
const carPO = require('./pageObject/carPO').default;

async function getData(url) {
	const { data } = await axios.get(url);
	return cheerio.load(data);
}

async function getAllCarData(url) {
	let carDataJson = {};
	const $ = await getData(url);
	carDataJson.modelo = $(carPO.carModel).html();
	const rawPrice = $(carPO.carPriceLabel).html();
	carDataJson.precio = rawPrice.split('&')[0] + '€';
	let campoDireccion2 = $(carPO.address2).html().split('i>')[1].split('&nbsp;');
	carDataJson.direccion = $(carPO.address1).html() + ', ' + campoDireccion2[0] + ', ' + campoDireccion2[1];
	let telefonos = $(carPO.phoneNumbers).html();
	telefonos = telefonos.replace('<li>', ' ');
	telefonos = telefonos.replace('<li>', ' ');
	telefonos = telefonos.replace('<li>', ' ');
	telefonos = telefonos.replace('<li>', ' ');
	telefonos = telefonos.replace('</li>', ' ');
	telefonos = telefonos.replace('</li>', ' ');
	telefonos = telefonos.replace('</li>', ' ');
	telefonos = telefonos.replace('</li>', ' ');
	carDataJson.telefonos = telefonos;
	return carDataJson;
}

exports.getAllCarData = (url) => getAllCarData(url);
