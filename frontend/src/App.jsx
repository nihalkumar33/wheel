import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddSlicePage from './pages/AddSlicePage';
import SpinPage from './pages/SpinPage';
import SliceListPage from './pages/SliceListPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>🎡 Wheel of Fortune</h1>
        <nav style={{ marginBottom: '1rem' }}>
          <Link to="/">Add Slice</Link> |{' '}
          <Link to="/spin">Spin</Link> |{' '}
          <Link to="/slices">View Slices</Link>
        </nav>
        <Routes>
          <Route path="/" element={<AddSlicePage />} />
          <Route path="/spin" element={<SpinPage />} />
          <Route path="/slices" element={<SliceListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
