import { useState } from "react";
import { ColorModeContext,useMode } from "./theme";
import{ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Topbar from "./layouts/global/Topbar";
import Dashboard  from "./layouts/dashboard/index";
import Sidebar from"./layouts/global/Sidebar";
import ProjectList from"./components/ProjectList";
import ListEntreprise from"./components/ListEntreprise";
import Entreprises from"./Controllers/ListeEntreprise";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value ={colorMode}>
  <ThemeProvider theme={theme}> 
  <CssBaseline/> 
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
      <main className="content">
      <Topbar setIsSidebar={setIsSidebar} />
      {/* routage probleme */}
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/" element={<Sidebar/>}/>
          <Route path="/Projects" element={<ProjectList />} />
          <Route path="/Clients" element={<Entreprises />} />
        </Routes>
      </main>
       </div>
    </ThemeProvider> 
    </ColorModeContext.Provider>
      
   
  );
}

export default App;
