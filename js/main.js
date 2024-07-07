//Buscar peliculas
const findMovies = async () => {
    const searchInput = document.getElementById('Input');

    try {
        const response = await axios.get(`https://www.omdbapi.com/?s=${(searchInput.value)}&page=1&apikey=48aa722f`);
        const data = await response.data;
        if(data.Search) {
            displayMovieList(data.Search);
        }

    } catch(error) {
        console.log(error);
    }
}

document.getElementById('Input').addEventListener('input', findMovies);

//Mostrar peliculas buscadas
const displayMovieList = movies => {
    let moviePoster = '';

    for(i of movies) {
        let img = '';
            if(i.Poster != 'N/A') {
                img = i.Poster;
            } else {
                img = 'img/no-poster.png';
            }
            const id = i.imdbID;

        moviePoster += `

            <article class="fav-item">
                <section class="fav-poster">
                    <a href="movie.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
                </section>

                <section class="fav-details-box">
                    <nav class="fav-movie-name">
                        <a href="movie.html?id=${id}">${i.Title}</a></p>
                    </nav>
                    
                    <nav class="fav-movie-rating">
                        <a href="movie.html?id=${id}">${i.Year}</a></p>
                    </nav>
                </section>
            </article>

       `       
    }

    document.querySelector('.fav-container').innerHTML = moviePoster;
}

//Mostrar detalles pelicula buscada
async function infoMovie() {
    try {
        const urlQueryParams = new URLSearchParams(window.location.search);
        const id = urlQueryParams.get('id');
        console.log(id);
        const url = `https://www.omdbapi.com/?i=${id}&apikey=48aa722f`;
        const response = await axios.get(`${url}`);
        const data = await response.data;
        console.log(data);
        console.log(url);

        const detailMovie = `

            <div class="movie-poster">
                <img src=${data.Poster} alt="Movie Poster">
            </div>
            <div class="movie-details">
                <div class="details-header">
                    <h2>${data.Title}</h2>
                </div>
                <span class="details-italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Calificación - <b>${data.imdbRating}</b>/10 </i></span>
                <ul class="details-ul">
                    <li><strong>Actores: </strong>${data.Actors}</li>
                    <li><strong>Director: </strong>${data.Director}</li>
                    <li><strong>Escritores: </strong>${data.Writer}</li>
                </ul>
                <ul class="details-ul">
                    <li><strong>Género: </strong>${data.Genre}</li>
                    <li><strong>Fecha de lanzamiento: </strong>${data.DVD}</li>
                    <li><strong>Ventas en taquilla: </strong>${data.BoxOffice}</li>
                    <li><strong>Duración: </strong>${data.Runtime}</li>
                </ul>
                <p class="details-plot">${data.Plot}</p>
            </div>
        `
        document.querySelector('.movie-container').innerHTML = detailMovie;

    } catch(error) {
        console.log(error);
    }
}