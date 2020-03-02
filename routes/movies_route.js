const router = require('express').Router();

const { searchMovie } = require('../api/tmdb');

//
router.get('/:movie_name', async (req, res, next) => {
  const movie = req.params.movie_name;
  //
  if (movie.trim() !== '') {
    try {
      const datas = await searchMovie(movie);
      res.status(200);
      res.json(datas);
      //
    } catch (error) {
      res.status(422);
      error = new Error(error);
      next(error);
    }
  } else {
    res.status(422);
    error = new Error('movie not found');
    next(error);
  }
});

module.exports = router;
