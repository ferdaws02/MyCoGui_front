import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material"
import { tokens } from "../theme"

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogin = () => {
    const data = {
      username,
      password,
    };

    fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          setError(null);
          navigate('/dashboard');
        } else {
          setError(response.statusText);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };



  const showPassword = () => {
    const pswrd = document.getElementById('pswrd');
    const icon = document.querySelector('.fas');
    if (pswrd.type === "password") {
      pswrd.type = "text";
      pswrd.style.marginTop = "10px";
      icon.style.color = "#7f2092";
    } else {
      pswrd.type = "password";
      icon.style.color = "grey";
    }
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100vh",
  };

  const loginFormStyles = {
    fontFamily: "'Noto Sans TC', sans-serif",
    background: colors.greenAccent[650], // Set the background color here
    width: "430px",
    height: "500px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const loginTextStyles = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "white",
    padding: "25px 0 30px 25px",
    borderRadius: "5px 5px 0 0",
    display: "flex",
    justifyContent: "center", // Center the login text
    marginBottom: "70px"
  };

  const textFieldStyles = {
    height: "50px",
    width: "180%",
    padding: "0 10px",
    borderRadius: "3px",
    fontSize: "18px",
    outline: "none",
    marginBottom: "10px", // Add spacing between the text fields
    display: "flex",
    justifyContent: "center", // Center the text fields horizontally
  };

  const passwordInputStyles = {
    marginTop: "10px",
  };

  const signInButtonStyles = {
    marginTop: "auto", // Push the button to the bottom
    width: "130px",
    height: "45px",
    cursor: "pointer",
    lineHeight: "45px",
    borderRadius: "45px",
    marginBottom: "20px",
    marginTop: "50px",
  };

  const forgotPasswordStyles = {
    textDecoration: "none",
    fontSize: "12px",
    color: "white",
    padding: "0 0 20px 0", // Add spacing below the link
    borderRadius: "45px", // Use the same borderRadius as the button
    background: "transparent", // Use a transparent background
  };


  return (
    <div style={containerStyles}>
      <Box style={loginFormStyles}>
        <div style={loginTextStyles}>
          Login 
        </div>
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TextField
            variant="outlined"
            sx={{ ...textFieldStyles }}
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            sx={{ ...textFieldStyles, ...passwordInputStyles }}
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="pswrd"
          />
          <i className="fas fa-lock" style={{ position: "absolute", fontSize: "25px", color: "grey", margin: "15px 0 0 -45px", marginTop: "35px" }} onClick={showPassword}></i>
          <input
            type="submit"
            value="Se connecter"
            style={signInButtonStyles}
            onClick={handleLogin}
          />
          <a href="#" style={forgotPasswordStyles}>mot de passe oublié?</a>
        </form>
      </Box>
    </div>
  );
};

export default Auth;
