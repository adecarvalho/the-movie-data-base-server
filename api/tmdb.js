const fetch = require('node-fetch');

const url_image = 'https://image.tmdb.org/t/p/w300';
const url_search_begin = 'https://api.themoviedb.org/3/search/movie';
const url_movie_begin = 'https://api.themoviedb.org/3/movie';
const url_api_key = `?api_key=${process.env.API_KEY}`;
const url_language = '&language=fr';
const url_query = '&query=';
const url_append = '&append_to_response=credits';

//
function searchMovieById(id) {
  //const id = 3480;
  //
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${url_movie_begin}/${id}${url_api_key}${url_language}${url_append}`;

      const datas = await fetch(url);
      const result = await datas.json();

      const movie = {
        id: id,
        title: result.title,
        overview: result.overview,
        homepage: result.homepage,
        popularity: result.popularity,
        vote_average: result.vote_average,
        vote_count: result.vote_count,
        poster_url: `${url_image}${result.poster_path}`,
        backdrop_url: `${url_image}${result.backdrop_path}`,
        release_date: result.release_date,
        runtime: result.runtime,
        genres: [],
        director: [],
        screenplay: [],
        sound: [],
        cast: []
      };
      //genres
      const rangesTab = result.genres;
      rangesTab.forEach(element => {
        console.log(element.name);
        movie.genres.push(element.name);
      });

      //crew
      const crewTab = result.credits['crew'];

      //director
      const tabDirector = crewTab.filter(item => {
        return item.job === 'Director';
      });
      tabDirector.forEach(elm => {
        movie.director.push(elm.name);
      });

      //screenplay
      const tabScreenPlay = crewTab.filter(item => {
        return item.department === 'Writing';
      });
      tabScreenPlay.forEach(element => {
        movie.screenplay.push(element.name);
      });
      //

      //music
      const tabMusic = crewTab.filter(item => {
        return item.job === 'Original Music Composer';
      });
      tabMusic.forEach(element => {
        movie.sound.push(element.name);
      });

      //cast
      const castTab = result.credits['cast'];
      castTab.forEach(element => {
        //
        movie.cast.push({
          name: element.name,
          character: element.character,
          profile_url: element.profile_path
            ? `${url_image}${element.profile_path}`
            : null
        });
      });

      resolve(movie);
    } catch (error) {
      reject(`Error fetch movie id= ${id}`);
    }
  });
  //
}

//
function searchMovie(movie_name) {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = [];

      const the_result = {};

      const url = `${url_search_begin}${url_api_key}${url_language}${url_query}${movie_name}`;

      //
      const datas = await fetch(url);

      const res = await datas.json();
      //
      the_result.page = res.page;
      the_result.total_results = res.total_results;
      the_result.total_pages = res.total_pages;

      const { results } = res;
      console.log(results);
      //
      results.forEach(item => {
        const film = {
          id: item.id,
          title: item.title,
          popularity: item.popularity,
          vote_average: item.vote_average,
          overview: item.overview,
          release_date: item.release_date,
          poster_path: item.poster_path
            ? `${url_image}${item.poster_path}`
            : null,
          backdrop_path: item.backdrop_path
            ? `${url_image}${item.backdrop_path}`
            : null
        };
        //
        movies.push(film);
      });
      the_result.movies = movies;
      //

      resolve(the_result);

      //
    } catch (error) {
      reject('Error search movie in the data base');
    }
  });
}

//
module.exports = { searchMovie, searchMovieById };
