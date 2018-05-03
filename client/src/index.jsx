import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import createHistory from 'history/createBrowserHistory'
import {BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import userReducer from './reducers/userReducer.js'
import tripReducer from './reducers/tripReducer.js'
import chatReducer from './reducers/chatReducer.js'

import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import TripMenu from './pages/TripMenuPage.jsx'
import TripItinerary from './pages/TripItineraryPage.jsx'
import TripDetail from './pages/TripDetailPage.jsx'

import './styles/main.css'

const history = createHistory()
const middleware = routerMiddleware(history)

const reducers = combineReducers({
  userReducer,
  tripReducer,
  chatReducer,
  router: routerReducer
})

const store = createStore(
  reducers,
  applyMiddleware(thunk, middleware)
)


ReactDOM.render(
  <div>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/home" component={HomePage}/>
        <Route exact path="/trip/:name" component={TripMenu}/>
        <Route exact path="/trip/:name/itinerary" component={TripItinerary}/>
        <Route exact path="/trip/:name/details" component={TripDetail}/>


      </div>
    </ConnectedRouter>
  </Provider>
  </div>,
  document.getElementById('app')
)