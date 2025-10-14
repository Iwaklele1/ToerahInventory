import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DetailInventoryPage from './pages/DetailInventoryPage'

function App() {

  return (
    <div className='app'>
      <Header />
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/detailinventory' element={<DetailInventoryPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
