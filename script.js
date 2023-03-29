const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

//get initial movie
getMovies(API_URL)
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        /*here we are using destructuring of movie object and just picking the data that we are in need like title gives us the name of the movie , posterpath gives us the image of the movie, voteavergage gives us the rating of the moive , overview gives the overview of that movie*/
        const { title, poster_path , vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                <p>${overview}</p>
            </div>
        `

        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 5 && vote < 8){
        return 'orange'
    }else if(vote < 5){
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTearm = search.value
    // console.log(searchTearm)

    if(searchTearm && searchTearm !== ''){
        getMovies(SEARCH_API + searchTearm)

        search.value = ''
    }else{
        window.location.reload()
    }
})