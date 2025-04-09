import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './routes/User';
import CyberCampus from './routes/CyberCampus';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/cyberCampus/*" element={<CyberCampus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
