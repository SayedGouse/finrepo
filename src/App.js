import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp.jsx';
import Dasboard from './Components/Dasboard.jsx';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dasboard />} />
      </Routes>
    </Router>
   
  );
}

export default App;
