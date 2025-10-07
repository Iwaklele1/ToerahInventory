import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
