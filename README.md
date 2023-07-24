# Project Name

Weekend Movie Saga: 

A movie app the displays movie posters, and brings you to a details page with the genre and a brief discription. You can also add movies to the list!

## Details Page

I wrapped the posters in a <Link> element that would grab the id of that poster from the 
database and bring you to a details page.

I made the details page display the movie title, poster, description and genre. I used Sagas and Redux to handle the requests to the server.

The genres database is connected to the movie database via a third movies_genres database. The movies_genres database contains the id's for items in both databases. I made a details router thats make an SQL request to grab the movie details and any genres with over lapping id's.

I added a "Back to List" button that uses useHistory to go back to the movie list.

## Add Movie Page

I also created an Add Movie Form where users can add to movies to the movie list.

I connected to this page via a button near the top of the list page.

This page contain an input for the title, poster image url, a textarea for the description, 
and a drop down box where you can add multiple genres.

There's also a 'Cancel' button that goes back to the list and a 'Save' button that posts the
new movie to the database using Saga/redux and a movie router. On click the user goes to the updated list page.

I wanted to try making a cool select box on my own but after spending too much time on that
I went with material_ui instead. This led to lots of trouble shooting and errors. I'll try
and decide earlier on in the process wether I want to use MUI in the future.

 ## Future goals for this project

 ### 1. Refresh on Details Page

Allow the app to maintain on refresh our details page.
Research the [useParams](https://reactrouter.com/en/main/hooks/use-params) hook for React Router.

### 2. Edit Page 
Add to the detail page an edit button that brings the user to the edit page.

This new page should show:

- an input field (for changing the movie title), for the selected movie.
- a textarea (for changing the movie description)

The edit page should have the buttons:

- `Cancel` button, which should bring the user to the Details Page
- `Save` button, which should update the title and description in the database and bring the user to the Details Page

### Other Ideas

- [ ] Display the current values in the input (title) and textarea (description) on the Edit Page
- [ ] Display all genres on movie list page. Research JSON_AGG to make this possible.
- [ ] Move sagas and reducers out of your `index.js` and into separate files (ideally in `src/redux/reducers` and `src/redux/sagas` folders).
- [ ] Allow the user to refresh the details or edit page. The url for the details page would be something like `/details/1` for movie with id of `1`. Research the [useParams](https://reactrouter.com/en/main/hooks/use-params) hook for React Router.
- [ ] Allow the user to add a genre to a movie.
- [ ] Allow the user to remove a genre from a movie.
- [ ] Only display the top 10 movies, and allow the user to search for movie titles with a search bar on the home page (you can do this on the client side or the server side, server side is a bigger stretch, but good practice).