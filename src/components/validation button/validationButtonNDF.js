import React, { useState,useEffect } from 'react';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { Button,Box,IconButton} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ValidationButtonNDF = ({id_ndf,onRefrech,etat}) => {
    const [roles, setRoles] = useState('');


 useEffect(() => {
    axios.get('/api/get-profile')
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
            setRoles(response.data.roles);
           
        } else {
          console.error('Failed to fetch user ID');
        }
      })
      .catch((error) => {
        console.error('Error while fetching data:', error);
      });
  }, []);


  const isConsultant = (roles) => {
    console.log("the role is " + roles + " the etat is " + etat);
    
    // Check if the user is a Consultant or Manager_Client with status not validation_client
    if (roles === 'Consultant'&& etat !== 'En_cour_de_validation_SM') {
      return true; // Disable the button for Consultants
    } else if (roles === 'Service_Manager' && etat !== "En_cour_de_validation_SM" ) {
      return true; // Disable the button for Service_Manager with status not validation_SM
    } else if (roles === 'Comptable' && etat !== 'En_cour_de_validation_comptabilité') {
      return true; // Disable the button for RH with status not validation_RH
    }
    return false; // Enable the button for all other cases
  };

  console.error('the role is '+roles);

  const handleStatusChange = async (id_ndf) => {
    let newStatus;
    switch (roles) {
      case "Service_Manager":
        newStatus = 'En_cour_de_validation_comptabilité';
        break;
      case 'Comptable':
        newStatus = 'valider';
        break;
    }
    console.log(newStatus);
  
    // Create an object with a property named 'etat'
    const dataToSend = {
      etat: newStatus,
    };
  
    axios.put(`/ODM/NDF/update/${id_ndf}`, dataToSend, {
      headers: {
        'Content-Type': 'application/json', // Make sure to set the content type to JSON
      },
    })
      .then(response => {
        console.log(response.data);
        window.location.reload();
        // Handle other actions here after a successful update
      })
      .catch(error => {
        console.error(error);
        // Handle errors here
      });
  };
  
      
 




return (
  <div>
    <IconButton onClick={() => handleStatusChange(id_ndf)} aria-label="Edit" size="large" id="Edit_BTN" disabled={isConsultant(roles)}>
                  <DoneOutlineOutlinedIcon fontSize="small"  />
                  </IconButton>
  </div>
);
};

export default ValidationButtonNDF;