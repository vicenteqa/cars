const getFormatedCarPrice = require('./scraper').getFormatedCarPrice;

const urlToScrape = process.argv[2];
getFormatedCarPrice(urlToScrape).then((formatedPrice) => console.log(formatedPrice));
