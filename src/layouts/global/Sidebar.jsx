import { useState } from "react";
import { ProSidebar, Menu, MenuItem ,SubMenu} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import AirlineSeatFlatOutlinedIcon from '@mui/icons-material/AirlineSeatFlatOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  return (
    <Box 
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "2px 20px 5px 5px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[700]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.greenAccent[400]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}  style={{ height:'150%'}} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                MyCoGui
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

         

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Tableau de bord"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                      <SubMenu
                     style={{
                      color: colors.grey[100],
                      hover:colors.greenAccent[700],
                      
                    }}
            title="Réferentiels"
            // to="/Gestion Réferentiel"
            icon={<StorageOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          >
            <MenuItem
              icon={<AirlineSeatFlatOutlinedIcon />}
              onClick={() => {
                navigate('/TypeConge') 
              }}
             
            >
              Type de Congé
            </MenuItem>
    
          </SubMenu>
          <Item
              title="Comptes"
              to="/Consultants"
              icon={<PersonAddAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
{/* 
            <Typography
              variant="h6"
              color={colors.grey[200]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
         
            <Item
              title="Clients"
              to="/Clients"
              icon={<DomainOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
            id="Project"
              title="Projets"
              to="/Projects"
              icon={<FactCheckOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

<SubMenu
                style={{
                  color: colors.grey[100],
                  hover:colors.greenAccent[700],
                }}
            title="Affectations "
            // to="/Gestion Réferentiel"
            icon={<HandshakeOutlinedIcon  />}
            selected={selected}
            setSelected={setSelected}
          >
            <MenuItem
              icon={<SquareFootOutlinedIcon />}
              onClick={() => {
                navigate('/Gestion_aff_ptojet') 
              }}
             
            >
              Projets
            </MenuItem>
            <MenuItem
              icon={<ManageAccountsOutlinedIcon/>}

              onClick={() => {
                navigate('/Gestion_aff_MI') 
              }}
            >
                 Managers Inetum  
            </MenuItem>
            <MenuItem
           
              icon={<  SupervisedUserCircleOutlinedIcon/>}

              onClick={() => {
                navigate('/Gestion_aff_MC') 
              }}
            >
                     Managers Clients  
            </MenuItem>
          </SubMenu>
           
            
            <Item
              title="ODM|NDF"
              to="/ODM"
              icon={<AssignmentTurnedInOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Congés"
              to="/conges"
              icon={<EventOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu
                  style={{
                    color: colors.grey[100],
                    hover:colors.greenAccent[700],
                  }}
            title="Demandes|Réclamations"
            // to="/Gestion Réferentiel"
            icon={<LibraryBooksOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          >
            <MenuItem
              icon={<ListAltOutlinedIcon />}
              onClick={() => {
                navigate('/Demandes') 
              }}
             
            >
              Demandes
            </MenuItem>
            <MenuItem
              icon={<ReportGmailerrorredOutlinedIcon/>}

              onClick={() => {
                navigate('/Reclamations') 
              }}
            >
              Réclamations
            </MenuItem>
          </SubMenu>

         
            <Item
              title="FeedBacks"
              to="/feed"
              icon={<AddReactionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
