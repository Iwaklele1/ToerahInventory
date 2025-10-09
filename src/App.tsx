// di src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/HomePage';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
