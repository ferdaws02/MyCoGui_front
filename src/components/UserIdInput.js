import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';

const UserIdInput = ({ onFieldChange }) => {
  const [userId, setUserId] = useState('');
  const [userNom, setuserNom] = useState('');
  const [userPrenom, setuserPrenom] = useState('');


  useEffect(() => {
    axios.get('/api/get-profile')
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setUserId(response.data.idc);
          setuserNom(response.data.nom_c);
          setuserPrenom(response.data.prenom_c);

          onFieldChange({
            userId: response.data.idc,
            userNom: response.data.nom_c,
            userPrenom: response.data.prenom_c,
          });
        } else {
          console.error('Failed to fetch user ID');
        }
      })
      .catch((error) => {
        console.error('Error while fetching data:', error);
      });
  }, [onFieldChange]);

  return (
    <div>
    
      <TextField
       label="Matricule"
        variant="outlined"
        color="info"
        id="userIdInput"
        type="text"
        name="userId"
        value={userId}
        fullWidth
        margin="normal"
        disabled
        readOnly
      />
         <TextField
       label="Nom"
        variant="outlined"
        color="info"
        id="userIdInput"
        type="text"
        name="userId"
        value={userNom}
        fullWidth
        margin="normal"
        disabled
        readOnly
      />
         <TextField
       label="Prenom"
        variant="outlined"
        color="info"
        id="userIdInput"
        type="text"
        name="userId"
        value={userPrenom}
        fullWidth
        margin="normal"
        disabled
        readOnly
      />
    </div>
  );
};

export default UserIdInput;

