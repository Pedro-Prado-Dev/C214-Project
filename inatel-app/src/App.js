import './App.css';
import LoginPage from './pages/login_page/login';
import HomePage from './pages/home_page/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/home-page" element={<HomePage />}/>

      </Routes>
    </Router>
  );
}

export default App;
