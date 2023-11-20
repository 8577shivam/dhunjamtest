import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Admin-Login" element={<Auth />} />
        <Route path="/Admin-Detail" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
