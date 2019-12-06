import React, { Component } from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import MyNavBar from './components/MyNavBar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Create from './pages/Create'
import Delete from './pages/Delete'
import Update from './pages/Update'
import SearchCom from './pages/ReadCom'
import CreateCom from './pages/CreateCom'
import UpdateCom from './pages/UpdateCom'
import DeleteCom from './pages/DeleteCom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import DetailJob from './pages/DetailJob'

function PageNotFound() {
  return <h2>404, Page Not Found</h2>
}

function DetailPekerjaan( {match} ) {
  return (
    <h2> this is {match.params.jobId} </h2>
  )
}

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MyNavBar />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/tambah' component={Create} exact />
          <Route path='/hapus' component={Delete} exact />
          <Route path='/perbarui' component={Update} exact />
          <Route path='/masuk' component={Login} exact />
          <Route path='/daftar' component={Signup} exact />
          <Route path='/keluar' component={Logout} exact />
          <Route path='/lihatcom' component={SearchCom} exact />
          <Route path='/tambahcom' component={CreateCom} exact />
          <Route path='/perbaruicom' component={UpdateCom} exact />
          <Route path='/hapuscom' component={DeleteCom} exact />
          <Route path='/pekerjaan/:jobId' component={DetailJob} exact />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </BrowserRouter>
    )
  }
}
