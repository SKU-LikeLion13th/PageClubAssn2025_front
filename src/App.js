import './css/style.css';
import Footer from './components/Footer';
import { Route, Routes } from "react-router-dom";
import User from './routes/User';

function App() {
  return (
    <div className="flex flex-col min-h-screen App">
      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path = "/*" element={<User/>}/>
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;