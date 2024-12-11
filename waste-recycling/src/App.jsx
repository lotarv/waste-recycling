import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import TableView from './pages/TableView/TableView'
import TechDetails from './pages/TechDetails/TechDetails';
import Header from './components/Header/Header';
import TechnologyForm from './pages/Form/Form';
function App() {

  return (
    <>
      <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<TableView />} />
        <Route path="/details/:id" element={<TechDetails />} />
        <Route path = "/form" element = {<TechnologyForm/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
