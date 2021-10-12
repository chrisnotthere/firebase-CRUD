import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { getFirebaseConfig } from './firebase.js';
import { initializeApp } from 'firebase/app';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

ReactDOM.render(<App />,document.getElementById('root')
);
