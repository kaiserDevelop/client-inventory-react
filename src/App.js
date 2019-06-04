import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import SaveEdit from './pages/SaveEdit.jsx';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/inventoryadd/:id' component={SaveEdit}/>
        </Switch>
        </Router>
        </div>
  );
}

export default App;
