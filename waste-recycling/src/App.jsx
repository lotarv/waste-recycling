import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import TechnologiesTableView from './pages/technologiesView/TechnologiesView'
import TechDetails from './pages/TechDetails/TechDetails';
import Header from './components/Header/Header';
import TechnologyFormNew from './pages/TechnologyForm/TechnologyFormNew';
import WasteProducersFormNew from './pages/WasteProducersForm/WasteProducersFormNew';
import WasteProducersView from './pages/WasteProducersView.jsx/WasteProducersView';
function App() {

  return (
    <>
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<TechnologiesTableView />} />
        <Route path="/details/:id" element={<TechDetails />} />
        <Route path = "/technologyForm" element = {<TechnologyFormNew/>}></Route>
        <Route path = "/wasteProducersForm" element = {<WasteProducersFormNew/>}></Route>
        <Route path = "/wasteProducersView" element = {<WasteProducersView/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
