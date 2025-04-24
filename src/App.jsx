import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Locator from './pages/Locator';

export default function App() {
  return (
    // <h1>hello</h1>
    <Router>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locator" element={<Locator />} />
      </Routes>
    </Router>
  );
}