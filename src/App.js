import React, { Component } from 'react'
import { Route } from 'react-router'
import HomeContainer from './layouts/home/HomeContainer'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Styles // TBD Following Three Style to be removed...
// import './css/oswald.css'
// import './css/open-sans.css'
// import './css/pure-min.css'

import './css/main.css';
import './css/icomoon.css';
import './css/background.css';

//import './App.css'

class App extends Component {
  render() {
    // <div className="App">
    return (
      
      <div className="container-fluid p-0">
        <Route exact path="/" component={HomeContainer}/>

        <ToastContainer position="bottom-right" autoClose={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable />
        <footer></footer>
      </div>

    );
  }
}

export default App
