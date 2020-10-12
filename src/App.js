import React from 'react';
import 'bulma/css/bulma.css';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import SearchTrackListContainer from './components/SearchTrackListContainer/SearchTrackListContainer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/generator' component={SearchTrackListContainer} />
      </Switch>
    </div>
  );
}

export default App;
