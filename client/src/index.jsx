import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import './styles/main.css'
import './styles/waffle-grid.min.css'

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
import MembersList from './pages/MembersPage.jsx'
import Discovery from './pages/DiscoverPlacesPage.jsx'
import BrowsePlaces from './pages/BrowsePlacesPage.jsx'
import AddToItinerary from './pages/AddToItinerary.jsx'

import { auth } from '../../firebase/index.js';

const history = createHistory()
const middleware = routerMiddleware(history)

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet
}

const rootReducer = combineReducers({
  userReducer,
  tripReducer,
  chatReducer,
  router: routerReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  undefined,
  compose(
    applyMiddleware(thunk, middleware),
    // composeWithDevTools()
  )
  // composeWithDevTools(applyMiddleware(thunk, middleware))
)

const persistor = persistStore(store)

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
        <PrivateRoute exact path="/home" component={HomePage}/>
        <PrivateRoute exact path="/trip/:name" component={TripMenu}/>
        <PrivateRoute exact path="/trip/:name/itinerary" component={TripItinerary}/>
        <PrivateRoute exact path="/trip/:name/details/:dayNumber" component={TripDetail}/>
        <PrivateRoute exact path="/trip/:name/members" component={MembersList}/>
        <PrivateRoute exact path="/trip/:name/discovery" component={Discovery}/>
        <PrivateRoute exact path="/trip/:name/discovery/:category" component={BrowsePlaces}/>
        <PrivateRoute exact path="/trip/:name/discovery/:category/:placeName/addToItinerary" component={AddToItinerary}/>
      </div>
    </ConnectedRouter>
  </Provider>
  </div>,
  document.getElementById('app')
)