import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/home";
import AdminPanel from "./components/adminPanel";
import UserPanel from "./components/userPanel";
import Signin from "./components/signin";
import AdminNav from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <AdminNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="/userPanel" element={<UserPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
