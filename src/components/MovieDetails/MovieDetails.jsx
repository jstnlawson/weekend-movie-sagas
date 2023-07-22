import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//I somehow had no memory of useParams so this held me up awhile
import { useParams } from 'react-router-dom';


function MovieDetails() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const { id } = useParams();

    // Find movie by ID
    const clickedMovie = movies.find((movie) => movie.id === Number(id));

    useEffect(() => {
        dispatch({ type: 'MOVIE_DETAILS', payload: id });
    }, []);

    return (
        <main>
            <h1>MovieDetails</h1>
            <section className="movies">
                <div key={clickedMovie.id}>
                    <h3>{clickedMovie.title}</h3>
                    <img src={clickedMovie.poster} alt={clickedMovie.title} />
                    <p>{clickedMovie.description}</p>
                </div>
            </section>
        </main>
    );
}

export default MovieDetails;