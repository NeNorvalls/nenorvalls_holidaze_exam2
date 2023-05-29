import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";

const App = () => {
  return (
    <Router>
      <Layout></Layout>
    </Router>
  );
};

export default App;
