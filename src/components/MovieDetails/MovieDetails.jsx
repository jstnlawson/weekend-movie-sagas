import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';




function MovieDetails() {

    const dispatch = useDispatch();
    const clickedMovie = useSelector((store) => store.movieDetailsReducer); 
    

    // if (!clickedMovie) {
    //     return <h2>Loading...</h2>; // Or display a loading spinner
    //   }

    useEffect(() => {
        dispatch({ type: 'MOVIE_DETAILS', payload: id });
    }, [id]);

    const genres = clickedMovie.genres || [];

    return (
        <main>
            <h1>MovieDetails</h1>
            <section className="movies">
                <div key={clickedMovie.id}>
                    <h3>{clickedMovie.title}</h3>
                    <ul>
                        {/* map related genres */}
                        {clickedMovie.genres.map((genre) => (
                            <li key={id}>{genre}</li>
                        ))}
                    </ul>
                    <img src={clickedMovie.poster} alt={clickedMovie.title} />
                    <p>{clickedMovie.description}</p>
                </div>
            </section>
        </main>
    );
}

export default MovieDetails;