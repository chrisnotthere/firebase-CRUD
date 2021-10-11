import './App.css';
//import firebase from 'firebase';
import { Route, Switch } from 'react-router-dom';
import { Container, Segment } from 'semantic-ui-react';
import FirebaseCrud from './FirebaseCrud';

function App() {
  return (
    <Container>
      <FirebaseCrud></FirebaseCrud>
    </Container>
  );
}

export default App;
