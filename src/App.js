import { useState } from "react";
import { useEffect } from 'react';
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Topbar from "./layouts/global/Topbar";
import Footer from "./layouts/global/Footer";

import Dashboard from "./layouts/dashboard/index";
import ProjectList from "./Controllers/ProjetsController";
import Entreprises from "./Controllers/ListeEntreprise";
import AddForm from "./components/formAddusers";
import ListConsultant from "./components/ListeConsultants";
import ModifUser from "./components/ModifAccount";
import AjoutTC from "./components/ajoutTypeCongé";
import AjoutClient from './components/AjoutClientForm';
import ListConges from './components/listeConge';
import AffProjet from './components/AffectationProjet'
import Auth from "./components/Auth";
import Sidebar from"./layouts/global/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.title = 'MyCoGui';
    setIsSidebarOpen(location.pathname !== "/"); // Set the sidebar state based on the current path
  }, [location]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">

        <Topbar />
        <div className="content-wrapper">
          {isSidebarOpen && <Sidebar />} {/* Render the Sidebar component only when isSidebarOpen is true */}
          <main className="content">
            
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Projects" element={<ProjectList />} />
              <Route path="/Clients" element={<Entreprises />} />
              <Route path="/AddUser" element={<AddForm />} />
              <Route path="/Consultants" element={<ListConsultant />} />
              <Route path="/ModifUser/:id" element={<ModifUser />} />
              <Route path="/TypeConge" element={<AjoutTC />} />
              <Route path="/AddClient" element={<AjoutClient />} />
              <Route path="/conges" element={<ListConges />} />

              <Route path="/Affectations" element={<AffProjet/>}/>
            </Routes>
            </main>
          </div>
          
          <Footer style={{ position: "absolute", bottom: 0 }} />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
