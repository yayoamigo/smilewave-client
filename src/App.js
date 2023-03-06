import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.login.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user? <Home /> : <Register/>} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/login" element={ user ? <Navigate to="/"/> : <Login />} />
        <Route path="/messenger"
          element={ <Messenger />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
