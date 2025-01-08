import './css/style.css';
import Footer from './components/Footer';
import ExcellentClub from './pages/User/ExcellentClub';

function App() {
  return (
    <div className="flex flex-col min-h-screen App">
      {/* Main Content */}
      <div className="flex-grow">
        <ExcellentClub />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;