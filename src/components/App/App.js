import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route exact path="/" component={MovieList}>
          <MovieList />
        </Route>
        
        {/* Details page id as parameter*/}
        <Route exact path="/details/:id" component={MovieDetails}>
          <MovieDetails />
        </Route>
        {/* Add Movie page*/}
        <Route exact path="/form" >
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}


export default App;
