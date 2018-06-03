import React, { Component } from 'react';
import { Container,Jumbotron } from 'reactstrap';
import QuizForm from './forms/QuizForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Container>
          <Jumbotron>
            <QuizForm />
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default App;
