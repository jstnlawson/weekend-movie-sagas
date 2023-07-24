import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

//I added the material ui after trying for too long to make
//a suitable selector box myself, I spent a lot of time
//fixing the errors it caused but their selector box is pretty
//cool. I'll try to avoid bring


const MovieForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [genreName, setGenreName] = useState([]);
    const theme = useTheme()
    let [newMovie, setMovie] = useState({ title: '', poster: '', description: '', genres: [] });

    const addNewMovie = (event) => {
        event.preventDefault();
        dispatch({ type: 'ADD_MOVIE', payload: { ...newMovie, genres: genreName } });
        // Reset the form after submission
        setMovie({ title: '', poster: '', description: '', genres: newMovie.genres }); // Reset the form after submission
        history.push('/');
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const genres = [
        'Adventure',
        'Animated',
        'Biographical',
        'Comedy',
        'Disaster',
        'Drama',
        'Epic',
        'Fantasy',
        'Musical',
        'Romantic',
        'Science Fiction',
        'Space-Opera',
        'Superhero',
    ];

    const getStyles = (name) => {
        return {
            fontWeight: genreName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    };


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
                <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">Genres</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={newMovie.genres}
                            onChange={(event) => setMovie({ ...newMovie, genres: event.target.value })}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value, index) => (
                                        <Chip key={index} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {genres.map((name, index) => (
                                <MenuItem
                                    key={index}
                                    value={name}
                                    style={getStyles(name, newMovie.genres, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <button type='submit' value='Save'>Save</button>
                <button onClick={() => history.goBack()}>Cancel</button>
            </form>
        </div>
    )

}

export default MovieForm;
