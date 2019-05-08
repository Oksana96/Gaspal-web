import React, { Component, Suspense } from 'react';
import WebApp from './components/WebApp';
import Landing from './components/Landing';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'

library.add(faSearch, faFacebookF, faTwitter, faInstagram, faEnvelope)



class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">

      <Suspense fallback={(<div>Loading</div>)}>
        
        <Navbar/>
        <Switch>
          <Route exact path ='/' component = {Landing} />
          <Route path = '/web-app' component = {WebApp}/> 
          </Switch> 
          <Footer/>
      </Suspense>
        
      </div>
      </BrowserRouter>
    );
  }
}


export default App;
