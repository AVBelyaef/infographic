require('dotenv').config();
const path = require('path');
const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT ?? 5000;
const token = process.env.TOKEN;
const BASE_URL = process.env.URL;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/confluence/:idPage', (req, res) => {
  const { idPage } = req.params;
  axios
    .get(`${BASE_URL}${idPage}?expand=body.view`, {
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
    .then((resp) => {
      res.send({ title: resp.data?.title, body: resp.data?.body?.view?.value });
    })
    .catch((error) => {
      const {
        response: { data },
      } = error;

      res.send({ error: data });
    });
});

app.listen(port, () => {
  console.log(`Application listening on port: ${port}`);
});
