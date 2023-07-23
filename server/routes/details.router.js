// const express = require('express');
// const router = express.Router();
// const pool = require('../modules/pool')


// router.get('/details/:id', (req, res) => {
//     console.log('Received request for movie details:', req.params.id);
//     const movieId = req.params.id;
//     console.log('Received movie ID:', movieId)
//     const query = `
//         SELECT
//           movies.id,
//           movies.title,
//           movies.poster,
//           movies.description,
//           ARRAY_AGG(genres.name) AS genres
//         FROM
//           movies
//         JOIN
//           movies_genres ON movies.id = movies_genres.movie_id
//         JOIN
//           genres ON movies_genres.genre_id = genres.id
//         WHERE
//           movies.id = $1
//         GROUP BY
//           movies.id;
//       `;
//     pool.query(query, [movieId])
//         .then(result => {
//             console.log('Query result:', result.rows)
//             if (result.rowCount === 0) {
//                 res.status(404).send('Movie not found');
//             } else {
//                 const movie = result.rows[0];
//                 res.render('details', { movie });
//             }
//         })
//         .catch(err => {
//             console.log('ERROR: Get movie details', err);
//             res.sendStatus(500);
//         });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
  const movieId = req.params.id;
  console.log('Received request for movie details:', movieId);
  const query = `
    SELECT
      movies.id,
      movies.title,
      movies.poster,
      movies.description,
      ARRAY_AGG(genres.name) AS genres
    FROM
      movies
    JOIN
      movies_genres ON movies.id = movies_genres.movie_id
    JOIN
      genres ON movies_genres.genre_id = genres.id
    WHERE
      movies.id = $1
    GROUP BY
      movies.id;
  `;
  pool.query(query, [movieId])
    .then(result => {
      console.log('Query result:', result.rows);
      if (result.rowCount === 0) {
        res.status(404).send('Movie not found');
      } else {
        const movie = result.rows[0];
        res.send(movie); 
      }
    })
    .catch(err => {
      console.log('ERROR: Get movie details', err);
      res.sendStatus(500);
    });
});

module.exports = router;
