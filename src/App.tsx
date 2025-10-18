import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import DetailItemPage from './pages/DetailItemPage'

function App() {

  return (
    <div className='app'>
      <Header />
      <div>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/detailitem' element={<DetailItemPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
