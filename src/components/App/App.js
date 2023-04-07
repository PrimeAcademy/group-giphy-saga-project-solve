import React from 'react';
import Search from '../Search/Search';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import Favorites from '../Favorites/Favorites';

function App() {
  return (
    <Router>
        <nav>
          <Link to="/">Search</Link>
          -
          <Link to="/favorites">Favorites</Link>
        </nav>
        
        <Route path="/" exact>
          <Search />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>
    </Router>
  );
}

export default App;
