import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import GoalsPage from "./pages/goals.jsx";
import DomainsPage from "./pages/domains.jsx";
import TrackerPage from "./pages/tracker.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<TrackerPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="domains" element={<DomainsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
