import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LocationProvider } from '../context/locationContext';
import Dashboard from './components/admin/Dashboard';

import MapView from './components/MapView';
import "./App.css"

function App() {
  return (
    <LocationProvider>
      <Router>
        <Routes>
          <Route exact path='/' element={<MapView/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </LocationProvider>
  )
}

export default App
