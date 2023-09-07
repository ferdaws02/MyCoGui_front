import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { TextField, Button, Grid,Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AccountTypeSelect from './TypeDeCompte';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AjoutODM = ({ url }) => {
    const [formData, setFormData] = useState({
        debutodm: '',
        finodm: '',
        Description_odm: '',
        nbr_jour_tt: '',
        nbr_jour_sur_site: ''
      });
 
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleDateChange = (name, date) => {
        setFormData({
          ...formData,
          [name]: date,
        });
      };
      const CustomDatePicker = ({ label, value, onChange }) => (
        <DatePicker
          label={label}
          value={value || null} // Set value to null initially to keep the input field empty
          onChange={onChange}
          inputFormat={null} // Remove the "JJ/MM/YYYY" placeholder
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                shrink: true, // Make the label act as a placeholder
              }}
            />
          )}
        />
      );
      
      
      
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSend = {
            debutodm: formData.debutodm,
            finodm: formData.finodm,
            Description_odm: formData.Description_odm,
            nbr_jour_tt: formData.nbr_jour_tt,
            nbr_jour_sur_site: formData.nbr_jour_sur_site
        };
        axios
        .post('/ODM/ajoutODM', dataToSend)
        .then((response) => {
          console.log('Data sent to the database successfully:', response.data);
          // Optionally, you can perform additional actions after the data is successfully 
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error while sending data to the database:', error);
        });
       // onClose(); // Close the dialog after form submission
    
      };
      return (
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mt: 1, mb: 1, mr: 5, ml: 10, width: '50ch' },
          '& .MuiRadioGroup-root': { ml: 10 },
          '& .MuiFormControlLabel-root': { ml: 10 },
          '& .MuiInput-root': { mt: 3, ml: 10 },
        }}
        noValidate
        autoComplete="off"
      >
        
            <form onSubmit={handleSubmit}>
              <Typography variant="h2"  gutterBottom>
                Ajout ODM
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CustomDatePicker
                  label="debutodm"
                  value={formData.debutodm}
                  onChange={(date) => handleDateChange('debutodm', date)}
                />
              
              <CustomDatePicker
                  label="finodm"
                  value={formData.finodm}
                  onChange={(date) => handleDateChange('finodm', date)}
                />
              </LocalizationProvider>
               
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Description_odm"
                    name="Description_odm"
                    value={formData.Description_odm}
                    onChange={handleChange}
                  />
              
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="nbr_jour_tt"
                    name="nbr_jour_tt"
                    value={formData.nbr_jour_tt}
                    onChange={handleChange}
                  />
               
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="nbr_jour_sur_site"
                    name="nbr_jour_sur_site"
                    value={formData.nbr_jour_sur_site}
                    onChange={handleChange}
                  />
                <div>
                  <Button type="submit"  onClick={handleSubmit} color="info" variant="contained" sx={{ mt: 3, ml: 10 }}>
                    Submit
                  </Button>
                  </div>
              
            </form>
         
        </Box>
      );

    };
    

export default AjoutODM;