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
import ListeDemande from "./components/ListeDemande";
import ListeReclamation from "./components/ListReclamation";
import ListeFeedback from "./components/ListeFeedback";
import AjoutDemande from "./components/AjoutDemande";
import AjoutReclamation from "./components/AjoutReclamation";
import AjouterFeedback from "./components/AjouterFeedback";
import ModifUser from "./components/ModifAccount";
import AjoutTC from "./components/ajoutTypeCongé";
import AboutUs from "./components/AboutUs";
import AjoutClient from './components/AjoutClientForm';
import ListConges from './components/listeConge';
import TableauAffectation from './components/TableauAffectation';
import Auth from "./components/Auth";
import Sidebar from"./layouts/global/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AffProjet from './components/AffectationProjet';
import AffectationMI from './components/AffectationMI';
import EditTableauAffProjet from './components/EditAffectationProject';
import ListODM from './components/ODM';
import AjoutODM from './components/AjoutODM';
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
              <Route path="/AddAffectaion" element={<AffProjet />} />
              <Route path="/Affectations" element={<TableauAffectation/>}/>
              <Route path="/AddAffectationMI" element={<AffectationMI/>}/>
              <Route path="/ModifAff/:id" element={<EditTableauAffProjet/>}/>
              <Route path="/ODM" element={<ListODM/>}/>
              <Route path="/AddODM" element={<AjoutODM/>}/>
              <Route path="/Demandes" element={<ListeDemande />} />
              <Route path="/Reclamations" element={<ListeReclamation />} />
              <Route path="/feed" element={<ListeFeedback />} />
              <Route path="/AddDemande" element={<AjoutDemande />} />
              <Route path="/AddReclamation" element={<AjoutReclamation />} />
              <Route path="/AddFeedback" element={<AjouterFeedback />} />
              <Route path="/about" element={<AboutUs />} />
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
