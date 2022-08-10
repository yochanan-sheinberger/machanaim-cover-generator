import './App.css';
import Home from './components/home/Home';
import useGaTracker from './utils/useGaTracker';

function App() {
  useGaTracker();
  return (
    <Home />
  );
}

export default App;
