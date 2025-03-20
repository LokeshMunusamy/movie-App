let movieContainer = document.querySelector('.movie-div');
let search = document.querySelector('.search');
let searchTitleInput = document.querySelector('.search-title');

let loginName = localStorage.getItem('userName');

document.querySelector('.show-name').textContent = loginName;

let genreDetails = {
    28: 'Action',
    80: 'Crime', 
    53: 'Thriller',
    18: 'Drama', 
    10751: 'Family',
    35: 'Comedy',
    12: 'Adventure',
    14: 'Fantasy',
    36: 'History',
    10749: 'Romance'
};

let movieAjax = new XMLHttpRequest();

function getMethod(title = '') {
    movieAjax.open('GET', 'https://mimic-server-api.vercel.app/movies');
    movieAjax.responseType = 'json';
    
    movieAjax.onload = function () {
        if (movieAjax.status === 200) {
            let movieData = movieAjax.response;
            if (title) {
                movieData = movieData.filter(movie => movie.title.toLowerCase().includes(title.toLowerCase()));
            }
            displayMovies(movieData);  
        } 
    };
    
    movieAjax.send();
}

getMethod();

function displayMovies(movies) {
    movieContainer.innerHTML = '';  

    movies.forEach((movie) => {
        let action = movie.genre_ids;
        if (action) {
            action = action.map(n => !n ? '' : genreDetails[n]).join(',');
        }
    
        let movieCard = `
            <div class="bg-white p-4 rounded-lg shadow-md movie-card">
                <img src="${movie.poster_path}" alt="Movie Poster" class="rounded-md w-full">
                <h3 class="mt-4 text-xl font-semibold text-gray-900 title">${movie.title}</h3>
                <p class="text-gray-700 mt-2">Language: ${(movie.original_language === 'ta') ? 'Tamil' : 'English'}</p>
                <p class="text-gray-700 mt-2">Release Date: ${movie.release_date}</p>
                <p class="text-gray-700 mt-2">Genre: ${action}</p> 
                <p class="text-gray-700 mt-2">Rating: <i class="fa-solid fa-star text-yellow-500"></i> ${movie.vote_average}/10</p>
                <p class="text-gray-700 mt-2">Adult: ${movie.adult ? 'Yes' : 'No'}</p>
            </div>
        `;
        movieContainer.innerHTML += movieCard;
    });
}

let addMovie = document.querySelector('#addMovieBtn');
let movieAddDiv = document.querySelector('#movieFormModal');

addMovie.addEventListener('click', () => {
    movieAddDiv.style.display = 'block';
});

document.querySelector('#closeModalBtn').addEventListener('click', () => {
    movieAddDiv.style.display = 'none';
});

function postAndSearch() {
    let path = document.querySelector('#movieImage').value; 
    let title = document.querySelector('#movieTitle').value;  
    let genre = document.querySelector('#movieGenre').value;  
    let language = document.querySelector('#movieLanguage').value;  
    let releaseDate = document.querySelector('#movieReleaseDate').value; 
    let rating = document.querySelector('#movieRating').value; 
    let adult = document.querySelector('#movieAdult').checked; 

    const newMovie = {
        poster_path: path,
        title: title,
        genre_ids: genre.split(','),  
        original_language: language,
        release_date: releaseDate,
        vote_average: rating,
        adult: adult
    };

    movieAjax.open('POST', 'https://mimic-server-api.vercel.app/movies');
    movieAjax.setRequestHeader('Content-Type', 'application/json'); 
    
    movieAjax.onload = function () {
        if (movieAjax.status === 200 || movieAjax.status === 201) {
            alert('Movie added successfully!');
            getMethod(); 
        }
    };

    movieAjax.send(JSON.stringify(newMovie));
}

document.getElementById('submit').addEventListener('click', function(e) {
    e.preventDefault();
    postAndSearch();  
    movieAddDiv.style.display = 'none'; 
});

searchTitleInput.addEventListener('keyup', function() {
    let searchTitle = searchTitleInput.value.trim();
    getMethod(searchTitle);
});