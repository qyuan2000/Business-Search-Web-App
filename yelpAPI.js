const fetch = require('node-fetch');
//const async = require('express-async-await');
const url = require('url');
const https = require('https');
//const HttpsProxyAgent = require('https-proxy-agent'); 

const yelpAPIkey = 'vkD76yqKgP_DPPTMuBmoc5aLDzPoHAy2svW2SDOuHOP8FpPlQo62dRgZESUd6yYfGY8MNG0M4YibGSKd8rJJmJfLut4P4VOIUvLduZht3U3tVf6ezTdTSUNqMnA_Y3Yx';
headers = {'Authorization': 'Bearer '+yelpAPIkey};
search_api_url = 'https://api.yelp.com/v3/businesses/search?';
detail_api_url = 'https://api.yelp.com/v3/businesses/';
auto_api_url = 'https://api.yelp.com/v3/autocomplete?text=';

module.exports.getBusiResult = getBusiResult;
module.exports.getBusiDetail = getBusiDetail;
module.exports.getBusiReview = getBusiReview;
module.exports.getAutoComplete = getAutoComplete;

async function getBusiResult(querystring) {
    
    let url = search_api_url+ querystring + "&limit=10";
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    console.log(searchRes);
    return searchRes;
}

async function getBusiDetail(busiId){
    let url = detail_api_url + busiId;
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    console.log(searchRes);
    return searchRes;
}

async function getBusiReview(busiId){
    let url = detail_api_url + busiId +"/reviews";
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    console.log(searchRes);
    return searchRes;
}

async function getAutoComplete(keyword){
    let url = auto_api_url+keyword;
    console.log("url", url);
    let APIres = await fetch(url, {method: 'GET', headers: headers});
    let searchRes = await APIres.json();
    console.log(searchRes);
    return searchRes;
}