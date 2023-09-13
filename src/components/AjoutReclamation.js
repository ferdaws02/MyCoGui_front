import React, { useState, useEffect } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { postData } from '../Api';
import UserIdInput from './UserIdInput'; // Import UserIdInput component

const AjoutReclamation = () => {
  const [formData, setFormData] = useState({
    id_consultant: "",
    nom_consultant: "",
    prenom: "",
    date_reclamation: new Date().toISOString().split('T')[0],
    objet: "",
    description: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/get-profile');

      if (response.status === 200) {
        const userData = await response.json();
        setFormData({
          ...formData,
          id_consultant: userData.idc,
          nom_consultant: userData.nom_c,
          prenom: userData.prenom_c,
        });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const ReclamationData = {
      id_consultant: formData.id_consultant,
      nom_consultant: formData.nom_consultant,
      prenom: formData.prenom,
      date_reclamation: formData.date_reclamation,
      objet: formData.objet,
      description: formData.description,
    };

    try {
      const response = await postData('/ajouter_Reclamation', ReclamationData);

      if (response.ok) {
        console.log('Réclamation submitted successfully');
        window.location.reload();
      } else {
        throw new Error('Error submitting data');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mt: 1, mb: 1, mr: 5, ml: 50, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2 style={{ marginLeft: 20 }}>Ajouter Réclamation</h2>
      <Formik onSubmit={handleSubmit}>
        <div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="id_consultant"
              value={formData.id_consultant}
              onChange={handleInputChange}
              label="Id Consultant"
              disabled
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="nom_consultant"
              value={formData.nom_consultant}
              onChange={handleInputChange}
              label="Nom Consultant"
              disabled
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              label="Prenom"
              disabled
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="date"
              name="date_reclamation"
              value={formData.date_reclamation}
              disabled
              label="Date Réclamation"
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="objet"
              value={formData.objet}
              onChange={handleInputChange}
              label="Objet"
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              multiline  // Enable multiline input
              rows={4}    // Specify the number of rows
              fullWidth   // Take up the full width
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              label="Description"
            />
          </div>
          <div>
            <Button
              onClick={handleSubmit}
              color="info"
              variant="contained"
              sx={{ mt: 3, ml: 65 }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Formik>
    </Box>
  );
};

export default AjoutReclamation;
