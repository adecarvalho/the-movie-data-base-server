const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//
const port = process.env.PORT || 8080;

const app = express();

//functions
const notFound = (res, req, next) => {
  const err = new Error('Route not found');
  res.status(404);
  next(err);
};
//
const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
};
//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: 'The Movie Data Base Serveur auteur A.DeCarvalho 2020'
  });
});
//
app.use('/tmdb/api/v1/movies', require('./routes/movies_route'));
//
app.use('/tmdb/api/v1/movie', require('./routes/movie_route'));

//
app.use(notFound);
app.use(errorHandler);

//connected
app.listen(port, () => {
  console.log(`server connected on port ${port}`);
});
