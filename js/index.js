const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "10e8b9c00ceca653b48fe8be3107714d";

document.addEventListener("DOMContentLoaded", () => {
    renderNewsMovies();
    renderListMovies('popular', 'now-playing__list');
    renderListMovies('top_rated', 'top-rated-playing__list');
})

const getMovies = (type) => {
    const url = `${URL_PATH}/3/movie/${type}?api_key=${API_KEY}&language=es-ES&page=1`;

    return fetch(url)
        .then(response => response.json())
        .then(result => result.results)
        .catch(error => console.log(error))
}


const renderNewsMovies = async () => {
    const newMovies = await getMovies('now_playing');

    let html = '';

    newMovies.forEach((movie, index) => {
        const { id, title, overview, backdrop_path } = movie;
        const urlImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
        const urlMovie = `../movie.html?id=${id}`;


        html += `
            <div class="carousel-item ${index === 0 ? "active" : null}" style="background-image: url('${urlImage}')">
                <div class="carousel-caption">
                    <h5>${title}</h5>
                    <p>${overview}</p>
                    <a href="${urlMovie}" class="btn btn-primary">Más Informacion</a>
                </div>
            </div>
        `;
    });

    html += `
        <a class="carousel-control-prev" href="#carousel-news-movies" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Anterior</span>
        </a>
        <a class="carousel-control-next" href="#carousel-news-movies" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Siguiente</span>
        </a>
    `;

    document.getElementsByClassName('list-news-movies')[0].innerHTML = html;

}

const renderListMovies = async (type, classLoc) => {
    const movies = await getMovies(type);

    let html = "";
    movies.forEach((movie, index) => {
        const { id, title, poster_path } = movie;
        const movieCover = `https://image.tmdb.org/t/p/w500${poster_path}`;
        const urlMovie = `../movie.html?id=${id}`;

        if (index < 9) {
            html += `
                <div class="card" style="align-items:center; border:none;margin:4px 4px 4px 1px">
                    <img src="${movieCover}" alt="${title}">
                    <h3>${title}</h3>
                    <a href="${urlMovie}" class="btn btn-primary">Ver Más</a>
                </div>
                
            `;
        }
        document.getElementsByClassName(classLoc)[0].innerHTML = html;
    })

}