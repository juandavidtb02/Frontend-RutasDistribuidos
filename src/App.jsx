import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocationProvider } from '../context/locationContext';
import { UserProvider } from '../context/UserContext';
import Dashboard from './components/admin/Dashboard';

import MapView from './components/MapView';
import "./App.css"

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<MapView/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
