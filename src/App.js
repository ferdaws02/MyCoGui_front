import { useState } from "react";
import { useEffect } from 'react';
import { ColorModeContext,useMode } from "./theme";
import{ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Topbar from "./layouts/global/Topbar";
import Dashboard  from "./layouts/dashboard/index";
import Sidebar from"./layouts/global/Sidebar";
import ProjectList from"./Controllers/ProjetsController";
import Entreprises from"./Controllers/ListeEntreprise";
import AddForm from"./components/formAddusers";
import ListConsultant  from"./components/ListeConsultants";
import ModifUser from "./components/ModifAccount";
import AjoutTC from "./components/ajoutTypeCongé";
import AjoutClient from './components/AjoutClientForm';
import ListConges from'./components/listeConge';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  useEffect(() => {
    document.title = 'MyCoGui';
  }, []);
  return (
    <ColorModeContext.Provider value ={colorMode}>
  <ThemeProvider theme={theme}> 
  <CssBaseline/> 
    <div className="app">
    <Sidebar isSidebar={isSidebar}/>
      <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      {/* routage probleme */}
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/" element={<Sidebar/>}/>
          <Route path="/Projects" element={<ProjectList />} />
          <Route path="/Clients" element={<Entreprises />} />
          <Route path="/AddUser" element={<AddForm />} />
          <Route path="/Consultants" element={<ListConsultant />} />
          <Route path="/ModifUser/:id" element={<ModifUser />} />
          <Route path="/TypeConge" element={<AjoutTC />} />
          <Route path="/AddClient" element={<AjoutClient />} />
          <Route path="/conges" element={<ListConges />} />
        </Routes>
      </main>
       </div>
    </ThemeProvider> 
    </ColorModeContext.Provider>
      
   
  );
}

export default App;
