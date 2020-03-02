const router = require('express').Router();

const { searchMovieById } = require('../api/tmdb');

//
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  //
  if (id.trim() !== '') {
    try {
      const datas = await searchMovieById(id);
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
