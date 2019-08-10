import React from 'react';
import './App.css';
import Navbar from "./components/navbar"
import Works from './components/works';
import 'bootstrap/dist/css/bootstrap.css';
import AddWork from "./components/addWork";
function App() {
  return (
    <div className="container">
      <header className="App-header">
        <Navbar/>
        <AddWork/>
        <Works/>
      </header>
    </div>
  );
}

export default App;
