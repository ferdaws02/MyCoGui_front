import React, { useState, useEffect } from 'react';
import { Box, IconButton, Menu, MenuItem, useTheme, Avatar } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
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
  const [userId, setUserId] = useState('');


  useEffect(() => {
    // Fetch user ID from the server
    axios.get('/api/get-profile')
      .then((response) => {
        if (response.status === 200) {
          setUserId(response.data.idc);
        } else {
          console.error('Failed to fetch user ID');
        }
      })
      .catch((error) => {
        console.error('Error while fetching user ID:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch user profile image URL using the fetched userId
    if (userId) {
      axios.get(`http://localhost:8086/PFE/getimage/${userId}`)
        .then(response => {
          const imageData = response.data;
          // Assuming the response contains the image data as base64 or a URL
          setUserProfileImage(imageData);
        })
        .catch(error => {
          console.error("Error fetching user profile image:", error);
        });
    }
  }, [userId]); // The effect runs once after the component mounts

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


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
      window.location.reload()
    }



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
      {/*SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
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
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>

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
          <MenuItem onClick={handleuser}>Déconnexion</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default Topbar;