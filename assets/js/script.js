( () => {
      // cookie
      $('#cookieModal').modal('show');


      // API

      const TOP_MOVIES = document.getElementById("top-movies");
      const FEATURED_MOVIES = document.getElementById("featured-movies");
      const SHOP = document.getElementById("shop-movies");
      const TEMPLATE = document.getElementById("template");
      let numberOfFeatured = 12;
      let activeSlide = 0; //Caroussel position
      let footLastActive = 0; //Footer latest movies position
      let footPopActive = 0; //Footer latest movies position
      let slides = [
            document.getElementById("slide1"),
            document.getElementById("slide2"),
            document.getElementById("slide3"),
            document.getElementById("slide4"),
            document.getElementById("slide5")
      ];
      const FOOT_LAST = [
            document.getElementById("foot1"),
            document.getElementById("foot2"),
            document.getElementById("foot3"),
            document.getElementById("foot4")
      ];
      const FOOT_POPULAR = [
            document.getElementById("footPop1"),
            document.getElementById("footPop2"),
            document.getElementById("footPop3"),
            document.getElementById("footPop4"),
            document.getElementById("footPop5"),
            document.getElementById("footPop6")
      ]

      const KEY = "7f7e0630f2410d5c2d9f0a18fc195d27";

      const createArticle = (target, source) => {
            let isFooter;
            Array.from(target).forEach(el => {
                  isFooter = el.classList.contains("isFooter");
            })
            if(!isFooter) { // DONT CREATE ARTCLE WHEN FOOTER IS TARGETED
                  let affiche = document.importNode(TEMPLATE.content, true);
                  affiche.querySelector("article a p").textContent = source.genre;
                  affiche.querySelector("article div h4").textContent = source.title;
                  affiche.querySelector("article div .year").textContent = source.release;
                  affiche.querySelector("article div .price").textContent = "";
                  affiche.querySelector("a").style.backgroundImage = `url("${source.poster}")`;
                  affiche.querySelector("a").setAttribute("href", source.trailer);
                  affiche.querySelector("a").setAttribute("target", "_blank");
                  affiche.querySelector("a").setAttribute("title", "Click to watch trailer");
                  target.appendChild(affiche);
            }
      }

      const createMovie = (source1, source2) => {
            return {
                  title: source1.title.split("(").splice(0, 1).join(""),
                  backdrop: `https://image.tmdb.org/t/p/w1280/${source1.backdrop_path}`,
                  poster: `https://image.tmdb.org/t/p/w400${source1.poster_path}`,
                  genre: source1.genres[0].name,
                  release: source1.release_date.split("-").splice(0, 1).join(""),
                  trailer: `https://www.youtube.com/watch?v=${source2.results[0].key}`,
            }
      }

      const carousselConstruct = (film, position) => {
            slides[position].style.backgroundImage = `url("${film.backdrop}")`;
            slides[position].querySelector("div div p.movie-title-inCar").textContent = film.title;
            slides[position].querySelector("div div p a").setAttribute("href", film.trailer);
      }

      const addFooterLast = (film, position) => {
            FOOT_LAST[position].querySelector("img").setAttribute("src", film.backdrop);
            FOOT_LAST[position].querySelector("p").innerHTML = film.title;
      }

      const addFootPop = (film, position) => {
            FOOT_POPULAR[position].setAttribute("src", film.poster);
      }

      const getMovies = async (url, number, target, addToCaroussel, addToFooter, addFootPopular) => {
            const RESPONSE = await fetch(url);
            const DATA = await RESPONSE.json();
            const RESULTS = await DATA.results;
            const RETURNED_MOVIES = RESULTS.splice(0, number);

            RETURNED_MOVIES.forEach(async movie => {
                  const RESPONSE = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${KEY}`);
                  const DATA = await RESPONSE.json();
                  const VIDEO = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${KEY}`);
                  const VIDEO_DATA = await VIDEO.json();
                  const MOVIE = createMovie(await DATA, await VIDEO_DATA);
                  if(addToCaroussel) {
                        carousselConstruct(MOVIE, activeSlide);
                        activeSlide++;
                  }
                  else if(addToFooter) {
                        addFooterLast(MOVIE, footLastActive);
                        footLastActive++;
                  }
                  else if(addFootPopular) {
                        addFootPop(MOVIE, footPopActive);
                        footPopActive++;
                  }
                  createArticle(target, MOVIE);
            });
      };


      // RUNNING

      getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`, 5, TOP_MOVIES, true, false, false); //TOP
      getMovies(`https:///api.themoviedb.org/3/trending/movie/week?api_key=${KEY}`, 12, FEATURED_MOVIES, false, false, false); //FEATURED
      getMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&sort_by=release_date.desc`, 8, SHOP, false, false, false); //SHOP
      getMovies(`https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&sort_by=release_date.desc`, 4, FOOT_LAST, false, true, false); //FOOTER LATEST
      getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`, 6, FOOT_POPULAR, false, false, true); //FOOTER POPULAR


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


      // ARROW

      const DIV = document.createElement("div");
      const IMG = document.createElement("img");
      DIV.setAttribute("id", "arrow-up");
      IMG.setAttribute("src", "assets/img/up-arrow.png");
      DIV.appendChild(IMG);
      document.body.appendChild(DIV);
      const ARROW_UP = document.getElementById("arrow-up");

      ARROW_UP.addEventListener("click", () => {
            scrollToTop();
      });

      const scrollToTop = () => {
            const pos = document.documentElement.scrollTop || document.body.scrollTop;
            if (pos > 0) {
              window.requestAnimationFrame(scrollToTop);
              window.scrollTo(0, pos - pos / 12); //Change this number for scroll speed (HIGH is FASTER)
            }
          };

      const JUMBOTRON = document.querySelector('.jumbotron');
      let jumbotronHeight =  JUMBOTRON.clientHeight  // pour trouver la hauteur d'un élément
      window.addEventListener('scroll', () => {
      if (window.scrollY > jumbotronHeight*0.1) {
            ARROW_UP.style.display = "block";
      }
      else {
            //NAVIGATOR.classList.remove('scroll');
            ARROW_UP.style.display = "none";
      }
})



      // CONTACT US CONFIRM

      document.getElementById('submitContact').addEventListener('click', (e)=> {
            let firstNameUser = document.getElementById('firstNameContact').value;
            let lastNameUser = document.getElementById('lastNameContact').value;
            let emailUser = document.getElementById('emailContact').value;
            let subjectUser = document.getElementById('subjectContact').value;
            let commentUser = document.getElementById('commentContact').value;
            document.getElementById('firstNameContactConfirm').textContent = firstNameUser;
            document.getElementById('lastNameContactConfirm').textContent = lastNameUser;
            document.getElementById('emailContactConfirm').textContent = emailUser;
            document.getElementById('subjectContactConfirm').textContent = subjectUser;
            document.getElementById('commentContactConfirm').textContent = commentUser;
            e.preventDefault();
      })


})();