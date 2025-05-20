import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import "./index.css"
import TechnologiesTableView from './pages/TechnologiesView/TechnologiesView'
import TechDetails from './pages/TechDetails/TechDetails';
import HomePage from './pages/HomePage/HomePage';
import TechnologyForm from './pages/TechnologyForm/TechnologyForm';
import WasteProducersForm from './pages/WasteProducersForm/WasteProducersForm';
import WasteProducersView from './pages/WasteProducersView.jsx/WasteProducersView';
import Header from './components/Header/Header';
import StatisticsView from './pages/StatisticsView/StatisticsView';
import FkkoView from './pages/FkkoView/FkkoView';
import OkpdView from './pages/OkpdView/OkpdView';
import ImplementersView from './pages/RealizatorsView/ImplementersView';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
function App() {

  return (
    <>
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/technologyView" element={<TechnologiesTableView />} />
        <Route path="/details/:id" element={<TechDetails />} />
        <Route path="/technologyForm" element={<TechnologyForm />} />
        <Route path="/wasteProducersForm" element={<WasteProducersForm />} />
        <Route path="/wasteProducersView" element={<WasteProducersView />} />
        <Route path="/statisticsView" element={<StatisticsView />} />
        <Route path="/realizatorsView" element={<ImplementersView />} />
        <Route path="/okpdView" element={<OkpdView />} />
        <Route path="/fkkoView" element={<FkkoView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
