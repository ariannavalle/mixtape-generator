import React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { Switch, Route } from 'react-router-dom';
import SearchTrackListContainer from './components/SearchTrackListContainer/SearchTrackListContainer';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={SearchTrackListContainer} />
      </Switch>
    </div>
  );
}

export default App;
