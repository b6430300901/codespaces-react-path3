import './App.css';
import Home from './Home';
import About from './About';
import Posts from './Posts';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to = "/posts?fname=Wiphawee&lname=Laokhimsawat">Post Greeting</Link></li>

          <li><Link to="/posts/1">posts id 1</Link></li>
          <li><Link to="/posts/2">posts id 2</Link></li>

        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Posts />} />
      </Routes>
    </BrowserRouter>);
}

export default App;
