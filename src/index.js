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
    yield takeEvery('ADD_MOVIE', addMovie)
}

function* addMovie(action) {
    try{
        const { title, poster, description, genres } = action.payload;
        yield axios.post('/api/form', {
          title,
          poster,
          description,
          genre_id: genres, 
        });
        yield put({ type: 'FETCH_MOVIES' });
      } catch (error) {
        console.log('error on addMovie:', error);
      }
  }

function* movieDetails(action) {
    try {
        const movieId = action.payload;
        console.log('Received movie ID:', movieId);
        const detailsResponse = yield axios.get(`/api/details/${action.payload}`);
        const clickedMovie = detailsResponse.data;
        yield put({ type: 'SET_DETAILS', payload: clickedMovie });
        console.log('SET_DETAILS payload:', clickedMovie);
    } catch (error) {
        console.log('get movie details error', error);
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
        console.log('Fetching all genres...')
        const genres = yield axios.get('/api/genre');
        console.log('get all genres:', genres.data);
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
        case 'ADD_MOVIE':
            return [...state, action.payload]
        default:
            return state;
    }
}

const movieDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
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
