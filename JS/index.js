document.addEventListener('DOMContentLoaded', function () {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const movieResults = document.getElementById('movieResults');

    const API_URL = ' http://www.omdbapi.com/';
    const API_KEY = '2e68f4a';  // Replace this with your actual API key from OMDb

    searchBtn.addEventListener('click', function () {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            fetchMovies(searchTerm);
        } else {
            alert('Please enter a movie name.');
        }
    });

    function fetchMovies(query) {
        const url = `${API_URL}?s=${query}&apikey=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    displayMovies(data.Search);
                } else {
                    movieResults.innerHTML = '<p>No results found.</p>';
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayMovies(movies) {
        movieResults.innerHTML = ''; // Clear previous results
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
            `;
            movieResults.appendChild(movieCard);
        });
    }
});
