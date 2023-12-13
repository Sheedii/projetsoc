  import React, { useState } from 'react';
  import './App.css';
  import "primereact/resources/themes/lara-light-indigo/theme.css";
  import "primereact/resources/primereact.min.css";
  import '/node_modules/primeflex/primeflex.css'
  import { Button } from 'primereact/button';
  import { Card } from 'primereact/card';
  import { httpClient } from './HttpClient';
  import LogoutButton from './components/logout/logout'
  import Map from './components/map/Map';
  import { Route, BrowserRouter as Router , Routes ,Switch  } from 'react-router-dom';
  import Navbar from './components/navbar/Navbar';
  import ReportFrom from './components/reportForm/ReportFrom';

  
  import Keycloak from 'keycloak-js';

  /*
    Init Options
  */
  let initOptions = {
    url: 'http://127.0.1:4000/',
    realm: 'prjetsoc',
    clientId: 'myclient',
  }

  let kc = new Keycloak(initOptions);

  kc.init({
    onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
    checkLoginIframe: true,
    pkceMethod: 'S256'
  }).then((auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      // Remove below logs if you are using this on production 
      console.info("Authenticated");
      console.log('auth', auth)
      console.log('Keycloak', kc)
      console.log('Access Token', kc.token)

      // http client will use this header in every request it sends 
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;

      kc.onTokenExpired = () => {
        console.log('token expired')
      }
    }
  }, () => {
    // Notify the user if necessary 
    console.error("Authentication Failed");
  });

  function App() {

  
    return (
      <div className="App">


            
              {/*<Button onClick={() => { kc.logout({ redirectUri: 'http://localhost:3000/' }) }}
                className="m-1 custom-btn-style"
                label='Logout'
    severity="danger" />*/}
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/report" element={<ReportFrom />} />
        </Routes>
      </div>
    </Router>
    <LogoutButton />


      </div>
    );
  }


  export default App;
