const express = require('express');
const app = express();
const yelpAPI = require('./yelpAPI');
const cors = require('cors');
bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/frontend-gcloud/dist/571hw8/"));

app.get('/', (req, res) => {
  res.sendFile(process.cwd()+"/frontend-gcloud/dist/571hw8/index.html");
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on the port::${PORT}`);
});

app.get('/api/searchyelp/:keyword', async function (req, res) {
  console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
  // if not found, response is [] with length 0
  let origRes = await yelpAPI.getBusiResult(req.params.keyword);
  let msg = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${origRes.length}`;
  console.log(msg);
  return res.send(origRes);
  // if (origRes)
  //     return res.status(200).json(origRes);
})

app.get('/api/detailyelp/:keyword', async function (req, res) {
  console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
  // if not found, response is [] with length 0
  let origRes = await yelpAPI.getBusiDetail(req.params.keyword);
  let msg = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${origRes.length}`;
  console.log(msg);
  return res.send(origRes);
})

app.get('/api/reviewyelp/:keyword', async function (req, res) {
  console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
  // if not found, response is [] with length 0
  let origRes = await yelpAPI.getBusiReview(req.params.keyword);
  let msg = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${origRes.length}`;
  console.log(msg);
  return res.send(origRes);
})

app.get('/api/autowhynotwork/:keyword', async function (req, res) {
  console.log(`\nSearch-utilities Call: ${req.params.keyword}`);
  // if not found, response is [] with length 0
  let origRes = await yelpAPI.getAutoComplete(req.params.keyword);
  let msg = `${req.params.keyword} Search-utilities finished at ${Date()}\nLength of response: ${origRes.length}`;
  console.log(msg);
  return res.send(origRes);
})