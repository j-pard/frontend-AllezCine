( () => {
      const KEY = "7f7e0630f2410d5c2d9f0a18fc195d27";
      const TEMPLATE = document.getElementById("template");
      let popularMovies = [];

      const getPopular = async (url, number) => {
            const RESPONSE = await fetch(url);
            const DATA = await RESPONSE.json();
            const RESULTS = await DATA.results;
            const POPULAR_MOVIES = RESULTS.splice(0, number);
            
            POPULAR_MOVIES.forEach(async movie => {
                  const RESPONSE = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${KEY}`);
                  const DATA = await RESPONSE.json();
                  const VIDEO = await fetch(`http://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${KEY}`);
                  const VIDEO_DATA = await VIDEO.json();
                  const TRAILER = `https://www.youtube.com/watch?v=${VIDEO_DATA.results[0].key}`;
                  const MOVIE = {
                        title: DATA.title,
                        backdrop: `https://image.tmdb.org/t/p/w400${DATA.backdrop_path}`,
                        poster: `https://image.tmdb.org/t/p/w400${DATA.poster_path}`,
                        genre: DATA.genres[0].name,
                        release: DATA.release_date,
                        trailer: TRAILER
                  }
                  popularMovies.push(MOVIE);
            });
            console.log(popularMovies);
      }


      getPopular(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`, 5);
})();