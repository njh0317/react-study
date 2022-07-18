import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Counter from './Counter';
import Info from './Info';
function App() {
  const [visible, setVisible] = useState(false);
  return (
    <Info/>
  );
}

export default App;
