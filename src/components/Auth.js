
import React, { useState, useEffect } from "react";
import { Button, TextField ,Box} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material"
import { tokens } from "../theme"
const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const handleLogin = () => {
      const data = {
        username,
        password,
      };
    
      axios.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            setError(null);
            navigate('/dashboard');
          } else {
            setError("Login failed. Please check your credentials.");
          }
        })
        .catch((error) => {
          setError("Error during login. Please try again later.");
        });
    };
    
  const forgotPasswordStyles = {
    textDecoration: "none",
    fontSize: "12px",
    color: "white",
    padding: "0 0 20px 0", // Add spacing below the link
    borderRadius: "45px", // Use the same borderRadius as the button
    background: "transparent", // Use a transparent background
  };
  const loginTextStyles = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    padding: "25px 0 30px 25px",
    borderRadius: "5px 5px 0 0",
    display: "flex",
    justifyContent: "center", // Center the login text
    marginBottom: "30px"
  };
    
      return (
         <Box 
          component="form"
          sx={{
            '& .MuiTextField-root': {position: "center",width: '50ch' , marginTop: "30px"},
            '& .MuiFormControlLabel-root':{ml:10},
            '& .MuiInput-root':{ mt:3,ml:10}
            
          }}
          noValidate
          autoComplete="off"
        >
           <div style={loginTextStyles}>
          Login 
        </div>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div>
            <TextField
                variant="outlined"
           
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              </div>
              <div>
              <TextField
                variant="outlined"
             
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="pswrd"
              />
              {/* <i className="fas fa-lock" style={{ position: "absolute", fontSize: "25px", color: "grey", margin: "15px 0 0 -45px", marginTop: "35px" }} onClick={showPassword}></i> */}
            
              </div> 
              
            <Button
               color="info" 
               variant="contained"
               sx={{ width: "130px",
               height: "45px", borderRadius: "45px", backgroundColor:"white", marginTop: "30px"}}
                onClick={handleLogin}
            >
                Login
            </Button>
           
           
            {error && <p>{error}</p>}
              <a href="#" style={forgotPasswordStyles}>mot de passe oublié?</a>
            </form>
          </Box>
       
      );
    };
    
export default Auth;

