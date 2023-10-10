//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Tweet from './components/Tweet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
          <Route exact path="/" element={<Home/>}/>
            <Route exact path="/tweets" element={<Tweet/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
