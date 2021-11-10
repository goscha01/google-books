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

function axiosCall(req, res) {
  axios
    .get(bookUrl, {
      params: {
        q: req.params.param,
        key: apiKey,
      },
    })
    .then((response) => {
      if (response) {
        var api = response.data.items;
        var DbData = mapDataForDB(api, req.params.param);
        var RenderData = mapDataForRendering(api, req.params.param);
        dbconnection.balk(q.insertMultiQuery, DbData);
        res.status(200);
        res.send(RenderData);
      } else {
        res.status(404);
        res.json({ message: `Oops! Cannot find ${req}` });
      }
    });
}

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
