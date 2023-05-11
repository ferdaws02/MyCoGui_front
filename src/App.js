import { ColorModeContext,useMode } from "./theme";
import{ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import Topbar from "./layouts/global/Topbar";
import React from 'react';
function App() {
  const[theme,colorMode]=useMode();
  return (
    <ColorModeContext.Provider value ={colorMode}>
  <ThemeProvider theme={theme}> 
  <CssBaseline/> 
    <div className="app">
      <main className="content">
        <Topbar />
      </main>
       </div>
    </ThemeProvider> 
    </ColorModeContext.Provider>
      
   
  );
}

export default App;
