import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<} />
        </Routes>
      </div>
    </div>
  )
}

export default App
