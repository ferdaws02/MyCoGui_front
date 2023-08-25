import React, { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import AirlineSeatFlatOutlinedIcon from '@mui/icons-material/AirlineSeatFlatOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

 

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
  const [selected, setSelected] = useState('Dashboard');
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');

 

  const shouldShowMenu = (allowedRoles) => {
    return allowedRoles.some(role => userRole.includes(role));
  };

  useEffect(() => {
    // Fetch user role from the server
    axios
      .get('/api/get-profile')
      .then((response) => {
        if (response.status === 200) {
          setUserRole(response.data.roles); // Set the user's role
          console.log("the role "+userRole)
        } else {
          console.error('Failed to fetch user role');
        }
      })
      .catch((error) => {
        console.error('Error while fetching user role:', error);
      });
  }, []);

 

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '2px 20px 5px 5px !important',
        },
        '& .pro-inner-item:hover': {
          color: `${colors.greenAccent[700]} !important`,
        },
	'& .pro-menu-item.active': {
          color: `${colors.greenAccent[400]} !important`,
        },
        '& .pro-sidebar .pro-inner-list-item': {

          backgroundColor: 'transparent !important', // Set the background color you want here

        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: '150%' }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}

          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
             margin: '10px 0 20px 0',
              color: colors.grey[700],
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


          {shouldShowMenu(['Service_Manager']) && (
            <>
              <Item
                title="Tableau de bord"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <SubMenu
                style={{
                  color: colors.grey[100],
                  hover: colors.greenAccent[700],
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
                    navigate('/TypeConge');
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

              <Item
              id="Affectations"
              title="Affectations"
              to="Affectations"
              icon={<HandshakeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}

            />
            

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
            </>
          )}
          {shouldShowMenu([ 'Manager_Client', 'Manager_Inetum', 'RH', 'Consultant']) && (

  <>

    {/* Additional menu items for specific roles */}

    <Item
      id="Affectations"
      title="Affectations"
      to="Affectations"
      icon={<HandshakeOutlinedIcon />}
      selected={selected}
      setSelected={setSelected}
    />

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
        hover: colors.greenAccent[700],
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
          navigate('/Demandes');
        }}
      >
        Demandes
      </MenuItem>

      <MenuItem
        icon={<ReportGmailerrorredOutlinedIcon />}
        onClick={() => {
          navigate('/Reclamations');
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
  </>
)}

        </Menu>
      </ProSidebar>
    </Box>
  );
};


export default Sidebar;