import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenSource from './ScreenSource';
import ScreenArticlesBySource from './ScreenArticlesBySource';
import ScreenMyArticles from './ScreenMyArticles';
import {createStore, combineReducers}  from 'redux';
import {Provider} from 'react-redux';
import wishList from './wishList.reducer';

const store = createStore(combineReducers({wishList}));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path='/' exact component= {ScreenHome} />
          <Route path='/screensource' component={ScreenSource}/>
          <Route path='/screenarticlesbysource/:id' component={ScreenArticlesBySource}/>
          <Route path='/screenmyarticles' component={ScreenMyArticles}/>
        </Switch>
        </Provider>
    </Router>
  );
}

export default App;
