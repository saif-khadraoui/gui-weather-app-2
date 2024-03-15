import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/dashboard/home/Home'
import "./globals.css"
import History from './pages/dashboard/history/History'
import Analytics from './pages/dashboard/analytics/Analytics'
import Alerts from './pages/dashboard/alerts/Alerts'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Settings from './pages/dashboard/settings/Settings'

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
            <Route path="/dashboard/settings/:id" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
