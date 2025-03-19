let movieCotainer = document.querySelector('.movie-div');
let search = document.querySelector('.search');
let searchTitleInput = document.querySelector('.search-title');

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
let movieData = [];

movieAjax.open('GET', 'https://mimic-server-api.vercel.app/movies');
movieAjax.responseType = 'json';

movieAjax.onload = function () {
    if (movieAjax.status === 200) {
        movieData = movieAjax.response;  
        displayMovies(movieData);  
    } else {
        console.error('Request failed with status:', movieAjax.status);
    }
};

movieAjax.send();


function displayMovies(movies) {
    movieCotainer.innerHTML = '';  

    movies.forEach((movie) => {
        let action = '';
        movie.genre_ids.forEach((num) => {
            action += `${genreDetails[num]} `;
        });

        let movieCard = `
            <div class="bg-white p-4 rounded-lg shadow-md movie-card" data-id="${movie.id}">
                <img src="${movie.poster_path}" alt="Movie Poster" class="rounded-md w-full">
                <h3 class="mt-4 text-xl font-semibold text-gray-900">${movie.title}</h3>
                <p class="text-gray-700 mt-2">Release Date: ${movie.release_date}</p>
                <p class="text-gray-700 mt-2">Language: ${movie.original_language}</p>
                <p class="text-gray-700 mt-2">Rating: <i class="fa-solid fa-star text-yellow-500"></i> ${movie.vote_average}/10</p>
                <p class="text-gray-700 mt-2">Adult: ${movie.adult ? 'Yes' : 'No'}</p>
                <p class="text-gray-700 mt-2">Genre: ${action}</p>  
            </div>
        `;
        movieCotainer.innerHTML += movieCard;
        action = '';
    });

   
}

search.addEventListener('click', () => {
    let matchTitle = searchTitleInput.value.toLowerCase();
    console.log(movieData);
    let filteredMovies = movieData.filter((movie) => {
        return movie.title.toLowerCase().includes(matchTitle);
    });
    displayMovies(filteredMovies);
});





