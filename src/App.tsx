import { Routes, Route, Link } from 'react-router-dom';
import ScreenshotDemo from './components/ScreenshotDemo';
import SnapdomDemo from './components/SnapdomDemo';

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <nav className="p-4 border-b border-gray-800 flex gap-4 justify-center">
        <Link to="/" className="px-4 py-2 rounded hover:bg-gray-800 transition-colors">Home</Link>
        <Link to="/html2canvas" className="px-4 py-2 rounded hover:bg-gray-800 transition-colors">html2canvas Demo</Link>
        <Link to="/snapdom" className="px-4 py-2 rounded hover:bg-gray-800 transition-colors">Snapdom Demo</Link>
      </nav>

      <div className="container mx-auto py-8">
        <Routes>
          <Route path="/" element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold mb-4">Screenshot Library Comparison</h1>
              <p className="text-gray-400">Select a demo from the navigation menu above.</p>
            </div>
          } />
          <Route path="/html2canvas" element={<ScreenshotDemo />} />
          <Route path="/snapdom" element={<SnapdomDemo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
