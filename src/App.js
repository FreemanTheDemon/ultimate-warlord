import './App.css';
import React, {useState} from 'react';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  const [login, setLogin] = useState(false);

  let audio = new Audio("/audio/fanfare.mp3");

  if (!login) {
    setTimeout(()=> {
      audio.play();
    }, 100);
  }

  return (
    <div className="app">
      <Header />
      {login && <Login setLogin={setLogin} />}
      {!login && <Game />}
      <Footer />
    </div>
  );
}

export default App;
