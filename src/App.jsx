import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './routes/User';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/*" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
