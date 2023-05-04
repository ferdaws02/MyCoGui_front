import { ColorModeContext,useMode } from "./theme";
import{CssBasline,ThemeProvider} from "@mui/material";
import Topbar from "./layouts/global/Topbar";
function App() {
  const[theme,colorMode]=useMode();
  return (
    <ColorModeContext.Provider value ={colorMode}>
  <ThemeProvider theme={theme}> 
  <CssBasline/> 
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
