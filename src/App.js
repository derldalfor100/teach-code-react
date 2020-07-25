import React from 'react';
import Logo from './logo.svg';
import './App.scoped.scss';
import { HashRouter, Route, Link } from "react-router-dom";
import home from './components/home/home';
import about from './components/about/about';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React {process.env.NODE_ENV}: {process.env.ROOT_URL}
        </a>
      </header>
      <HashRouter basename='/'>
        <div className="page-wrapper">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <hr />
          <Route exact path="/" component={home} />
          <Route path="/about" component={about} />
        </div>
      </HashRouter>
    </div>
  );
}

// const Home = () => <div><h2>Home</h2></div>
// const About = () => <div><h2>About</h2></div>

export default App;
