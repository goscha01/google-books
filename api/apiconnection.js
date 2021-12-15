require("dotenv").config();

const axios = require("axios");


// const API_KEY = 'AIzaSyC3WtNnKDXtglXeJLTPWVVzpPLGTyd59O4'
// BOOKS_URL = 'https://www.googleapis.com/books/v1/volumes?'

//env veriables saved in the api route folde. While deploying the env shouldn be set in deployment enviroment
const API_KEY = process.env.API_KEY;
const BOOKS_URL = process.env.BOOKS_URL;


module.exports.axiosCall = axiosCall;

 async function axiosCall(req, res) {

  var response =  await axios.get(BOOKS_URL, {
    params: {
      q: req.params.param,
      key: API_KEY,
    },
  })

  return  mapData(response.data.items, req.params.param) 
   
}

//Maps api data to db format
function mapData(apiData, searchword) {
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

  }));
  return newApiData;
}
