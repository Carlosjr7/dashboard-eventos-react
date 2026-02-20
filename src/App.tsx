import { MainLayout } from "./layouts/MainLayout";
import { Routes, Route } from "react-router-dom";

import  Dashboard  from "./pages/Dashboard";
import  Eventos  from "./pages/Eventos";
import  Clientes  from "./pages/Clientes";
import  Configuracoes  from "./pages/Configuracoes";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Routes>
    </MainLayout>
  );
}

export default App;