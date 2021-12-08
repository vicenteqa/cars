const getAllCarData = require('./scraper').getAllCarData;

const urlToScrape = process.argv[2];
getAllCarData(urlToScrape).then((carData) => console.log(JSON.stringify(carData)));
