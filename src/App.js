import "./css/style.css";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import User from "./routes/User";
import Admin from "./routes/Admin";

function App() {
  return (
    <div className="App ">
      {/* Main Content */}
      <Routes>
        <Route path="/*" element={<User />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
