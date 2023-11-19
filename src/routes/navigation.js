import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "../pages/home";
import Perfil from "../pages/perfil"
const Ruta = () => {
return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
);
};

export default Ruta;
