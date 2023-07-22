import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_GENRES', fetchAllGenres)

    yield takeEvery('MOVIE_DETAILS', movieDetails)
    yield takeEvery('GENRE_DETAILS', genreDetails)
}

function* movieDetails(action) {
    try {
        const movieId = action.payload;

        // Fetch movie details
        const movieQuery = `
        SELECT
          movies.id,
          movies.title,
          movies.poster,
          movies.description
        FROM
          movies
        WHERE
          movies.id = $1;
      `;
        const movieResponse = yield call(axios.get, `/api/movie/query`, { params: [movieId] });

        // Fetch genres associated with the movie
        const genreQuery = `
        SELECT
          genres.name
        FROM
          genres
        JOIN
          movies_genres ON genres.id = movies_genres.genre_id
        WHERE
          movies_genres.movie_id = $1;
      `;
        const genreResponse = yield call(axios.get, `/api/genre/query`, { params: [movieId] });

        // Combine movie and genre data and dispatch to the store
        const clickedMovie = {
            ...movieResponse.data[0],
            genres: genreResponse.data.map((genre) => genre.name),
        };
        yield put({ type: 'SET_CLICKED_MOVIE', payload: clickedMovie });
    } catch (error) {
        console.log('get movie details error', error);
    }
}

function* genreDetails() {
    try {

    } catch {
        console.log('get genre details error');
    }
}


function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all movies error');
    }

}

function* fetchAllGenres() {
    // get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data });

    } catch {
        console.log('get all genres error');
    }

}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();



// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
            // case 'SET_CLICKED_MOVIE':
            // return action.payload;
        default:
            return state;
    }
}

const movieDetailsReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_CLICKED_MOVIE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        movieDetailsReducer,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);
