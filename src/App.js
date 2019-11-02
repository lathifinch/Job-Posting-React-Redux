import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import MyNavBar from './components/MyNavBar'

import Home from './pages/Home'

function PageNotFound() {
  return <h2>404, Page Not Found</h2>
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MyNavBar />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
