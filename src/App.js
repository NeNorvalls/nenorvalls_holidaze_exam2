import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./auth/Register/Register";
import Login from "./auth/Login/Login";
import Logout from "./auth/Logout/Logout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Venues from "./pages/Venues/Venues";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/venues" element={<Venues />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
