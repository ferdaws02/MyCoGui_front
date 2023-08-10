<<<<<<< HEAD
import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
=======
import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Avatar } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
>>>>>>> origin/takwa
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
<<<<<<< HEAD
import { default as SearchIcon } from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const handleuser= () => {
    axios
      .post('/logout')
      .then((response) => {
        console.log('Data sent to the database successfully:', response.data);
        // Optionally, you can perform additional actions after the data is successfully sent
      })
      .catch((error) => {
        console.error('Error while sending data to the database:', error);
      });
    navigate('/')
  }
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
=======
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Topbar = () => {
  const theme = useTheme();
  //const { mode, handleModeToggle } = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userProfileImage, setUserProfileImage] = useState(null); // State pour stocker l'URL de l'image de profil
  const [mode, setMode] = useState("light");


  useEffect(() => {
    // Make an API request to get the user profile image URL
    // Replace 'YOUR_BACKEND_API_URL' with the base URL of your backend API
    axios.get("http://localhost:8086/PFE/getimage/9966") // Replace '2020' with the actual user ID of the logged-in user
      .then(response => {
        const imageData = response.data;
         // Assuming the response contains the image URL as a string
        // setUserProfileImage(URL.createObjectURL(new Blob([imageData], { type: 'image/jpeg' })));
        setUserProfileImage(imageData);
      })
      .catch(error => {
        console.error("Error fetching user profile image:", error);
      });
  }, []); // The effect runs once after the component mounts

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Mettez ici la logique pour gérer la déconnexion de l'utilisateur
    // Par exemple, supprimez le token d'authentification, déconnectez-vous du backend, etc.
    handleCloseMenu();
  };

  const handleConsultants = () => {
    navigate('/Consultants');
    handleCloseMenu();
  };

  const handleModeToggle = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    colorMode.toggleColorMode(); // Toggle the mode from the ColorModeContext
  };

  return (
    
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {/* Logo */}
    <img src="./images/logo.jpg" style={{ width: '100px', height: '50px', marginLeft: '10px' }} />
>>>>>>> origin/takwa
      {/*SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
<<<<<<< HEAD
        
      </Box>
      {/*ICONS*/}
      <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
=======
        {/* Vous pouvez ajouter ici le composant InputBase pour la barre de recherche */}
      </Box>
      {/* Avatar and Menu */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={handleOpenMenu}>
          {userProfileImage ? (
            <Avatar alt="User Profile" src={userProfileImage} />
          ) : (
            <PersonOutlinedIcon /> // If the userProfileImage is not available, show a default icon, like PersonOutlinedIcon
          )}
         </IconButton>
      <IconButton onClick={handleModeToggle}>
        {mode === "dark" ? (
>>>>>>> origin/takwa
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
<<<<<<< HEAD
      <IconButton>
        <NotificationsOutlinedIcon />
      </IconButton>
      <IconButton>
        <SettingsOutlinedIcon />
      </IconButton>
      <IconButton onClick={handleuser}>
        <PersonOutlinedIcon />
      </IconButton>
      <IconButton></IconButton>
    </Box>
=======

      <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          {/* Add an Avatar and menu items here */}
          <Box display="flex" justifyContent="center" my={2}>
            {userProfileImage ? (
              <Avatar alt="User Profile" src={userProfileImage} />
            ) : (
              <Avatar alt="User Profile" /> // If the image is not available, show a default avatar
            )}
          </Box>
          <MenuItem onClick={handleConsultants}>Consultants</MenuItem>
          <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
        </Menu>
      </Box>
>>>>>>> origin/takwa
    </Box>
  );
}

export default Topbar;
<<<<<<< HEAD
=======





>>>>>>> origin/takwa
