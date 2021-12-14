import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import store from './redux/storeConfig';
import MainNavigation from './navigation/MainNavigation';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);

function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

export default App;
