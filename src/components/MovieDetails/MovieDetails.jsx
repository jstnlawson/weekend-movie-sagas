// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';




// function MovieDetails() {

//     const dispatch = useDispatch();
//     const clickedMovie = useSelector((store) => store.movieDetailsReducer); 
//     const { id } = useParams();


//     useEffect(() => {
//         console.log('Dispatching MOVIE_DETAILS action with payload:', id);
//         dispatch({ type: 'MOVIE_DETAILS', payload: id });
//     }, [dispatch, id]);

//     // if (!clickedMovie) {
//     //     console.log('Movie details are still being fetched...');
//     //     return <h2>Loading...</h2>; // Or display a loading spinner
//     //   }

//     const genres = clickedMovie.genres || [];

//     console.log('Movie details:', clickedMovie);

//     return (
//         <main>
//             <h1>MovieDetails</h1>
//             <section className="movies">
//                 <div key={clickedMovie.id}>
//                     <h3>{clickedMovie.title}</h3>
//                     <ul>
//                         {/* map related genres */}
//                         {clickedMovie.genres.map((genre) => (
//                             <li key={genre}>{genre}</li>
//                         ))}
//                     </ul> 
//                     <img src={clickedMovie.poster} alt={clickedMovie.title} />
//                     <p>{clickedMovie.description}</p>
//                 </div>
//             </section>
//         </main>
//     );
// }

// export default MovieDetails;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const dispatch = useDispatch();
  const clickedMovie = useSelector((store) => store.movieDetailsReducer);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'MOVIE_DETAILS', payload: id });
  }, [dispatch, id]);

  return (
    <main>
      <h1>MovieDetails</h1>
      <section className="movies">
        {clickedMovie && (
          <div key={clickedMovie.id}>
            <h3>{clickedMovie.title}</h3>
            <ul>
              {clickedMovie.genres.map((genre, index) => (
                <li key={index}>{genre}</li>
              ))}
            </ul>
            <img src={clickedMovie.poster} alt={clickedMovie.title} />
            <p>{clickedMovie.description}</p>
          </div>
        )}
      </section>
    </main>
  );
}

export default MovieDetails;

  