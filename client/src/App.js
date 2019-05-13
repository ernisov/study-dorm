import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Students from './modules/Students/Students';
import Dormitory from './modules/Dormitory/Dormitory';
import store from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Container>
              <Route path='/students' component={Students} />
              <Route path='/dorm' component={Dormitory} />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
