import React, { useContext } from 'react';

import Header from './components/Header';
import Characters from './components/Characters';
import './App.css';
import ThemeContext from './context/ThemeContext';

function App() {
  const { darkMode } = useContext(ThemeContext)
  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <Header />
      <Characters />
    </div>
  );
}

export default App;
