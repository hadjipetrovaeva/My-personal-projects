const movieInput = document.querySelector('.movie-input');
const searchBtn = document.querySelector('.search-btn');

const movieCard = document.querySelector('.movie-card');
const moviePoster = document.querySelector('.movie-poster');
const movieTitle = document.querySelector('.movie-title');
const movieYear = document.querySelector('.movie-year');
const movieGenre = document.querySelector('.movie-genre');
const movieRating = document.querySelector('.movie-rating');
const moviePlot = document.querySelector('.movie-plot');
const errorMessage = document.querySelector('.error-message');

const apiKey = '3e6e9f54';

searchBtn.addEventListener('click', searchMovie);

movieInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchMovie();
    }
});

async function searchMovie() {
    const movieName = movieInput.value.trim();

    if (movieName === '') {
        showError('Please enter a movie name.');
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'False') {
            showError('Movie not found. Try another title.');
            return;
        }

        showMovie(data);
    } catch (error) {
        showError('Something went wrong. Please try again.');
    }
}

function showMovie(movie) {
    errorMessage.classList.add('hidden');
    movieCard.classList.remove('hidden');

    moviePoster.src = movie.Poster !== 'N/A' ? movie.Poster : '';
    moviePoster.alt = movie.Title;

    movieTitle.textContent = movie.Title;
    movieYear.textContent = `Year: ${movie.Year}`;
    movieGenre.textContent = `Genre: ${movie.Genre}`;
    movieRating.textContent = `IMDb Rating: ${movie.imdbRating}`;
    moviePlot.textContent = movie.Plot;
}

function showError(message) {
    movieCard.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = message;
}