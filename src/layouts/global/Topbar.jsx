import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
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
      {/*SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        
      </Box>
      {/*ICONS*/}
      <Box display="flex">
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
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
    </Box>
  );
}

export default Topbar;
