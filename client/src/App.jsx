import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/dashboard/home/Home'
import "./globals.css"
import History from './pages/dashboard/history/History'
import Analytics from './pages/dashboard/analytics/Analytics'
import Alerts from './pages/dashboard/alerts/Alerts'

function App() {

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" index element={<Home />} />
            <Route path="/dashboard/history" element={<History />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/alerts" element={<Alerts />} />
          </Route>

        </Routes>
      </Router>
    </div>
  )
}

export default App
