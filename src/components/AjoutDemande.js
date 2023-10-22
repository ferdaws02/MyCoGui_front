import React, { useState, useEffect } from 'react';
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Formik } from 'formik';
import { postData } from '../Api';

const AjoutDemande = () => {
  const [formData, setFormData] = useState({
    consultant_demande: {idc:""} , // Updated field names to match backend
    nom_consultant: "",
    prenom: "",
    date_demande: new Date().toISOString().split('T')[0],
    typedemande: "",
    commentaire: "",
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
          consultant_demande:{idc:userData.idc} ,
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

    try {
      const response = await postData('/DemandeEtFormation/ajouter_Formation', formData);

      if (response.ok) {
        console.log('Demande submitted successfully');
        //window.location.reload();
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
        '& .MuiFormControl-root': { mt: 1, mb: 1, mr: 5, ml: 50, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h2 style={{ marginLeft: 20 }}>Ajouter Demande</h2>
      <Formik onSubmit={handleSubmit}>
        <div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="consultant_demande"
              value={formData.consultant_demande.idc}
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
              name="date_demande"
              value={formData.date_demande}
              disabled
              label="Date Demande"
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                variant="outlined"
                color="info"
                label="Type"
                name="typedemande"
                value={formData.typedemande}
                onChange={handleInputChange}
              >
                <MenuItem value="Demande_Formation">Demande_Formation</MenuItem>
                <MenuItem value="Demande_Papier">Demande_Papier</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
                {/* Add more options as needed */}
              </Select>
            </FormControl>
            {formData.typedemande === 'Demande_Formation' && (
        <div>
          <TextField
            label="Nom de Formation"
            type="text"
            name="nom_formation"
            value={formData.nom_formation}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Niveau</InputLabel>
            <Select
              name="niveau"
              value={formData.niveau}
              onChange={handleInputChange}
            >
              <MenuItem value="débutant">Débutant</MenuItem>
              <MenuItem value="intermédiaire">Intermédiaire</MenuItem>
              <MenuItem value="avancé">Avancé</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
          </div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              multiline
              rows={4}
              fullWidth
              type="text"
              name="commentaire"
              value={formData.commentaire}
              onChange={handleInputChange}
              label="Commentaire"
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

export default AjoutDemande;
