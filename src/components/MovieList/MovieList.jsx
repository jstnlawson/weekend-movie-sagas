import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({type: 'FETCH_GENRES'})
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <Link to="/form">
            <button>Add Movie</button>
            </Link>
            
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            {/* clickable link for each movie */}
                            <Link to={`/details/${movie.id}`}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} />
                            </Link>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;