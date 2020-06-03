require('dotenv').config();
const express = require('express');

const apiRoutes = require('./routes/api');

const app = express();
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
   next();
});

//serving static files
app.use(express.static('dist'));

//serving front-end js modules directly from node_modules
app.use('/scripts', express.static(`${__dirname}/node_modules`));

//API Routes
app.use('/api', apiRoutes);

// Express Error handler
app.use((err, req, res) => {
  if (err.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    res.status(403).send({ title: 'Server responded with an error', message: err.message });
  } else if (err.request) {
    // The request was made but no response was received
    res.status(503).send({ title: 'Unable to communicate with server', message: err.message });
  } else {
    // Something happened in setting up the request that triggered an Error
    res.status(500).send({ title: 'An unexpected error occurred', message: err.message });
  }
});

//redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));

app.listen(port, () => {
	console.log('server started on port %d', port);
});



