import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Entry from './components/Entry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/entry/:code" element={<Entry />} />
      </Routes>
    </Router>
  );
}

export default App;
