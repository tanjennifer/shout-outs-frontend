import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ListShoutout from "./components/ListShoutout";
import MeRoute from "./routes/MeRoute";
// import UserShoutouts from "./components/UserShoutouts";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListShoutout />} />
        <Route path="/user/:to" element={<ListShoutout />} />
        <Route path="/me" element={<MeRoute />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
