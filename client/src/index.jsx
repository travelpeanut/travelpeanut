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
import SignupPage from './pages/SignupPage.jsx'
import HomePage from './pages/HomePage.jsx'
import TripMenu from './pages/TripMenuPage.jsx'
import TripItinerary from './pages/TripItineraryPage.jsx'
import TripDetail from './pages/TripDetailPage.jsx'
import MembersList from './pages/MembersPage.jsx'
import Discovery from './pages/DiscoverPlacesPage.jsx'
import BrowsePlaces from './pages/BrowsePlacesPage.jsx'

import './styles/main.css'
import { auth } from '../../firebase/index.js';

const history = createHistory()
const middleware = routerMiddleware(history)

const rootReducer = combineReducers({
  userReducer,
  tripReducer,
  chatReducer,
  router: routerReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, middleware)
)

const authStatus = {
  ifLoggedIn: function(){
    let state = store.getState();
    let userToken = localStorage.getItem('userToken')
    if(userToken === state.userReducer.currentUser.uid){
      return true
    } else{
      return false
    }
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
       authStatus.ifLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />

      )
    }
  />
)


ReactDOM.render(
  <div>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <PrivateRoute exact path="/home" component={HomePage}/>
        <PrivateRoute exact path="/trip/:name" component={TripMenu}/>
        <PrivateRoute exact path="/trip/:name/itinerary" component={TripItinerary}/>
        <PrivateRoute exact path="/trip/:name/details" component={TripDetail}/>
        <PrivateRoute exact path="/trip/:name/members" component={MembersList}/>
        <PrivateRoute exact path="/trip/:name/discovery" component={Discovery}/>
        <PrivateRoute exact path="/trip/:name/discovery/:category" component={BrowsePlaces}/>

      </div>
    </ConnectedRouter>
  </Provider>
  </div>,
  document.getElementById('app')
)