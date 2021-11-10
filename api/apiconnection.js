require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
require("./routes")(app);
const dbconnection = require("./dbconnection");
const q = require("./queries");
const apiKey = process.env.API_KEY;
const bookUrl = process.env.BOOKS_URL;
var currentdate = new Date();

module.exports.axiosCall = axiosCall;
 async function axiosCall(req, res) {

  var response =  await axios.get(bookUrl, {
    params: {
      q: req.params.param,
      key: apiKey,
    },
  })
  result =  {'dbData': mapDataForDB(response.data.items, req.params.param),
              'renderData': mapDataForRendering(response.data.items, req.params.param)
            }
  return result
}





module.exports.mapDataForDB = mapDataForDB;

function mapDataForDB(apiData, searchword) {
  var newApiData = apiData.map((data) => [
    data.id,
    data.volumeInfo.title ? data.volumeInfo.title : null,
    data.volumeInfo.subtitle ? data.volumeInfo.subtitle : null,
    data.volumeInfo.authors ? data.volumeInfo.authors[0] : null,
    data.volumeInfo.description ? data.volumeInfo.description : null,
    data.volumeInfo.categories ? data.volumeInfo.categories[0] : null,
    data.volumeInfo.publisher ? data.volumeInfo.publisher : null,
    data.volumeInfo.publishedDate ? data.volumeInfo.publishedDate : null,
    data.volumeInfo.previewLink ? data.volumeInfo.previewLink : null,
    data.volumeInfo.imageLinks
      ? data.volumeInfo.imageLinks.smallThumbnail
      : null,
    searchword,
    currentdate,
  ]);
  return newApiData;
}

module.exports.mapDataForRendering = mapDataForRendering;

function mapDataForRendering(apiData, searchword) {
  var newApiData = apiData.map((data) => ({
    bookid: data.id,
    title: data.volumeInfo.title ? data.volumeInfo.title : null,
    subtitle: data.volumeInfo.subtitle ? data.volumeInfo.subtitle : null,
    authors: data.volumeInfo.authors ? data.volumeInfo.authors[0] : null,
    descr: data.volumeInfo.description ? data.volumeInfo.description : null,
    categories: data.volumeInfo.categories
      ? data.volumeInfo.categories[0]
      : null,
    pablisher: data.volumeInfo.publisher ? data.volumeInfo.publisher : null,
    publisherdate: data.volumeInfo.publishedDate
      ? data.volumeInfo.publishedDate
      : null,
    previewlink: data.volumeInfo.previewLink
      ? data.volumeInfo.previewLink
      : null,
    coverimage: data.volumeInfo.imageLinks
      ? data.volumeInfo.imageLinks.smallThumbnail
      : null,
    searchword: searchword,
    tstamp: currentdate,
  }));
  return newApiData;
}
