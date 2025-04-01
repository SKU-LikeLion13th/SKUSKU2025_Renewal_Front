import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./routes/User";
import "./css/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/*" element={<User />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
