
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

function MovieDetails() {
  const dispatch = useDispatch();
  const clickedMovie = useSelector((store) => store.movieDetailsReducer);
  const { id } = useParams();
  const history = useHistory()

  //use the id of the clicked poster to GET details
  useEffect(() => {
    dispatch({ type: 'MOVIE_DETAILS', payload: id });
  }, [dispatch, id]);

//display those deets
return (
    <main>
      <h1>MovieDetails</h1>
      <section className="movies">
        <div key={clickedMovie?.id}>
          <h3>{clickedMovie?.title}</h3>
          <ul>
            {/* Not sure I needed optional chaining here */}
            {clickedMovie?.genres?.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
          <img src={clickedMovie?.poster} alt={clickedMovie?.title} />
          <p>{clickedMovie?.description}</p>
          <button onClick={() => history.goBack()}>Back to List</button>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;

  