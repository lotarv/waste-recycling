import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import TechnologiesTableView from './pages/technologiesView/TechnologiesView'
import TechDetails from './pages/TechDetails/TechDetails';
import HomePage from './pages/HomePage/HomePage';
import DynamicHeader from './components/Header/DynamicHeader';
import TechnologyForm from './pages/TechnologyForm/TechnologyForm';
import WasteProducersForm from './pages/WasteProducersForm/WasteProducersForm';
import WasteProducersView from './pages/WasteProducersView.jsx/WasteProducersView';
function App() {

  return (
    <>
      <Router>
      <DynamicHeader></DynamicHeader>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/technologyView" element = {<TechnologiesTableView/>}></Route>
        <Route path="/details/:id" element={<TechDetails />} />
        <Route path = "/technologyForm" element = {<TechnologyForm/>}></Route>
        <Route path = "/wasteProducersForm" element = {<WasteProducersForm/>}></Route>
        <Route path = "/wasteProducersView" element = {<WasteProducersView/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
