( () => {

      // cookie

      $('#cookieModal').modal('show');

      // Movie gestion

      const TOP_MOVIES = document.getElementById("top-movies");
      const TEMPLATE = document.getElementById("template");

      const KEY = "7f7e0630f2410d5c2d9f0a18fc195d27";
      let popularMovies = [];

      const createArticle = (target, source) => {
            let affiche = document.importNode(TEMPLATE.content, true);
            affiche.querySelector("article div p").textContent = source.genre;
            affiche.querySelector("article div h4").textContent = source.title;
            affiche.querySelector("article div .year").textContent = source.release;
            affiche.querySelector("article div .price").textContent = "";
            affiche.querySelector(".affiche").style.backgroundImage = `url("${source.poster}")`;
            target.appendChild(affiche);
      }

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
                        release: DATA.release_date.split("-").splice(0, 1),
                        trailer: TRAILER
                  }
                  popularMovies.push(MOVIE);
                  createArticle(TOP_MOVIES, MOVIE);
            });
            console.log(popularMovies);
      }


      getPopular(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`, 5);
})();