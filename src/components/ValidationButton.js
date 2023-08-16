import React, { useState,useEffect } from 'react';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import { Button,Box,IconButton} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ValidationButton = ({id_conge,onRefrech,etat}) => {
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
    if (roles === 'Consultant') {
      return true; // Disable the button for Consultants
    } else if (roles === 'Service_Manager' && etat !== 'validation_SM') {
      return true; // Disable the button for Service_Manager with status not validation_SM
    } else if (roles === 'RH' && etat !== 'validation_RH') {
      return true; // Disable the button for RH with status not validation_RH
    } else if (roles === 'Manager_Client' && etat !== 'validation_client') {
      return true; // Disable the button for Manager_Client with status not validation_client
    }
    
    return false; // Enable the button for all other cases
  };

  console.error('the role is '+roles);

  const handleNotification = () => {
    // Show the toast notification
    toast.success('le compte est ajouter avec succé', {
      position: "top-right",
      autoClose: false, // Disable auto close
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, // Use the default progress bar
    });

    // Reload the page after a delay of 3 seconds (adjust as needed)
    setTimeout(() => {
    //  navigate('/Consultants'); 
    }, 3000);
  };
  const handleStatusChange = async(id_conge) => {
    let newStatus;
    switch (roles) {
              case "Consultant":
                newStatus="validation_client";
                break;
              case "Service_Manager":
                newStatus="validation_RH";
                  break;
              case 'RH':
                newStatus="valider";
                  break;
              case "Manager_Client":
                newStatus="validation_SM";
                  break;
              
            }
         
            try {
              // Make the API call to update the status on the backend
              const response = await axios.put(`/Conge/updateConge/${id_conge}`, {etat: newStatus });
        
              if (response.status === 200) {
                console.log(`Successfully updated status for Conge ID ${id_conge} to: ${newStatus}`);
                // Optionally, you can refresh the data from the backend after a successful update
                // fetchDataFromBackend();
              } else {
                console.error('Failed to update status on the backend.');
              }
            } catch (error) {
              console.error('Error updating status:', error);
            }
          };
      
 




return (
  <div>
    <IconButton onClick={() => handleStatusChange(id_conge)} aria-label="Edit" size="large" id="Edit_BTN" disabled={isConsultant(roles)}>
                  <DoneOutlineOutlinedIcon fontSize="small"  />
                  </IconButton>
  </div>
);
};

export default ValidationButton;