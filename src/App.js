import './css/style.css';
import Footer from './components/Footer';
import { Route, Routes } from "react-router-dom";
import User from './routes/User';

function App() {
  return (
    <div className="App">
      {/* Main Content */}
        <Routes>
          <Route path = "/*" element={<User/>}/>
        </Routes>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;