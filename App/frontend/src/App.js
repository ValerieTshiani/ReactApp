//import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Tweet from './components/Tweet';
import Users from './components/Users';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
          <Nav />
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/tweets" element={<Tweet/>} />
            <Route exact path="/users" element={<Users/>} />
            <Route exact path="/login" element={<Login/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
