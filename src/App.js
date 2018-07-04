import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom'

import Home from './pages/Home'
import Detail from './pages/Detail'
import { NotFound } from './pages/NotFound'
import Places from './pages/Places'

import './App.css';
import 'bulma/css/bulma.css'

class App extends Component {

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path = '/' component = {Places} />
          <Route exact path = '/detail/:id' component = {Detail} />
          <Route component = {NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
