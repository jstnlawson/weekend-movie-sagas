import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';


const MovieForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()


    //Initial state is an OBJECT??
    let [newMovie, setMovie] = useState({});

    const addNewMovie = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_MOVIE', payload: newMovie });
        //updates the next movie to have a new id
        setMovie({});
    }

    return (
        <div>
            <form onSubmit={addNewMovie} >
                <input type='text'
                    value={newMovie.title}
                    onChange={(event) => setMovie({ ...newMovie, title: event.target.value })}
                    placeholder='Movie Title' />
                <br></br>
                <input type='text'
                    value={newMovie.poster}
                    onChange={(event) => setMovie({ ...newMovie, poster: event.target.value })}
                    placeholder='Movie Poster URL' />
                <br></br>
                <textarea
                    value={newMovie.description}
                    onChange={(event) => setMovie({ ...newMovie, description: event.target.value })}
                    placeholder='Movie Description'
                >
                </textarea>
                <br></br>
                <select multiple name="languages" id="lang">
                    <option value="adventure">Adventure</option>
                    <option value="animated">Animated</option>
                    <option value="biographical">Biographical</option>
                    <option value="comedy">Comedy</option>
                    <option value="disaster">Disaster</option>
                    <option value="drama">Drama</option>
                    <option value="epic">Epic</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="musical">Musical</option>
                    <option value="romantic">Romantic</option>
                    <option value="science-fiction">Science Fiction</option>
                    <option value="space-opera">Space-Opera</option>
                    <option value="superhero">Superhero</option>
                </select>
                <input type='submit' value='Save' onClick={() => history.goBack()}/>
                <button onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )


}

export default MovieForm;
