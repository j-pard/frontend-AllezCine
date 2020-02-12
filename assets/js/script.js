( () => {

      const TOP_MOVIES = document.getElementById("top-movies");
      const FEATURED_MOVIES = document.getElementById("featured-movies");
      const TEMPLATE = document.getElementById("template");

      const KEY = "7f7e0630f2410d5c2d9f0a18fc195d27";
      let numberOfFeatured = 12;

      const createArticle = (target, source) => {
            let affiche = document.importNode(TEMPLATE.content, true);
            affiche.querySelector("article div p").textContent = source.genre;
            affiche.querySelector("article div h4").textContent = source.title;
            affiche.querySelector("article div .year").textContent = source.release;
            affiche.querySelector("article div .price").textContent = "";
            affiche.querySelector(".affiche").style.backgroundImage = `url("${source.poster}")`;
            target.appendChild(affiche);
      }

      const getMovies = async (url, number, target) => {
            const RESPONSE = await fetch(url);
            const DATA = await RESPONSE.json();
            const RESULTS = await DATA.results;
            const RETURNED_MOVIES = RESULTS.splice(0, number);

            RETURNED_MOVIES.forEach(async movie => {
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
                  createArticle(target, MOVIE);
            });
      }


      getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`, 5, TOP_MOVIES);
      getMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`, numberOfFeatured, FEATURED_MOVIES);

      document.getElementById("btn-load-more").addEventListener("click", () => {
            FEATURED_MOVIES.innerHTML = "";
            if(numberOfFeatured == 12) {
                  numberOfFeatured = 18;
                  document.getElementById("btn-load-more").textContent = "Load Less";
                  getMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`, numberOfFeatured, FEATURED_MOVIES);
            }
            else {
                  numberOfFeatured = 12;
                  document.getElementById("btn-load-more").textContent = "Load More";
                  getMovies(`https://api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`, numberOfFeatured, FEATURED_MOVIES);
            }

      });


      // Nav animation

      const NAVIGATOR = document.querySelector('.navbar');
      const JUMBOTRON = document.querySelector('.jumbotron');
      let jumbotronHeight =  JUMBOTRON.clientHeight  // pour trouver la hauteur d'un élément
      window.addEventListener('scroll', () => {
            if(window.scrollY > jumbotronHeight){
                  NAVIGATOR.classList.add('scroll');
            }
            else {
                  NAVIGATOR.classList.remove('scroll');
            }
      })
})();