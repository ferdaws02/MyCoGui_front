import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import {
  TextField,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  Input,
  RadioGroup,
  FormLabel,
  Grid,
  InputLabel,
} from '@mui/material';
import NumericTextField from './NumericTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import UserIdInput from './UserIdInput';
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AjoutODM = ({ url }) => {
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const[formData,setFormData]=useState(
  {
    debutodm: "",
    finodm: "",
    description_odm: "",
    nbr_jour_tt: 0, // Changez cette valeur en fonction de vos besoins de test
    nbr_jour_sur_site :0,
    consultantsOdm: {
      idc: '' // Remplacez par un ID de consultant valide
    },
    
    kmJour: 0,
    fraiskm: 0.5,
   
  
})
const [showOtherField, setShowOtherField] = useState(false);
const [userId, setUserId] = useState('');
const [numericValue, setNumericValue] = useState(0);
const [numericValue2, setNumericValue2] = useState(0);

const handleNumericChange = (e) => {
  // Allow only numeric values and empty input
  const newValue = e.target.value.replace(/[^0-9]/g, '');
  setNumericValue(newValue);
};
const handleNumericChange2 = (e) => {
  // Allow only numeric values and empty input
  const newValue = e.target.value.replace(/[^0-9]/g, '');
  setNumericValue2(newValue);
  if (parseInt(newValue, 10) > 0) {
    setShowOtherField(true);
  } else {
    setShowOtherField(false);
  }
};
const handleSubmit = async (event) => {
  event.preventDefault();
  const DatatoSend={
    debutodm: selectedDate1,
    finodm: selectedDate2,
    description_odm:formData.description_odm,
    nbr_jour_tt: numericValue, // Changez cette valeur en fonction de vos besoins de test
    nbr_jour_sur_site :numericValue2,
    consultantsOdm: {
      idc:userId // Remplacez par un ID de consultant valide
    },
    
    kmJour:formData.kmJour,
    fraiskm: formData.fraiskm,

  }

  try {
    // Make a POST request to your API endpoint
    const response = await fetch('/ODM/ajouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(DatatoSend), // Send the form data as JSON
    });

    if (response.status === 201) {
      // Data was successfully saved
      toast.success('Données enregistrées avec succès');
    } else {
      // There was an error in saving the data
      toast.error('Erreur lors de l\'enregistrement des données');
    }
  } catch (error) {
    // Handle any network or other errors
    toast.error('Erreur lors de la communication avec le serveur');
  }
};

const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
const handleFieldChange = (fieldValues) => {
  setUserId(fieldValues.userId);
};


return(
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
      <h2 style={{ marginLeft: 20 }}>Ajouter ODM</h2>
      <Formik onSubmit={handleSubmit}>
        <div>
        <UserIdInput onFieldChange={handleFieldChange} />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
           required
            label="debutodm"
            value={selectedDate1}
            onChange={(date) => setSelectedDate1(date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
          <DatePicker
           required
            label="finodm"
            value={selectedDate2}
            onChange={(date) => setSelectedDate2(date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <TextField
            required
              variant="outlined"
              color="info"
              type="text"
              multiline
              rows={4}
              name="description_odm"
              value={formData.description_odm}
              onChange={handleInputChange}
              label="description_odm"
            />
         <TextField
            required
              variant="outlined"
              color="info"
              name="nbr_jour_tt"
              value={numericValue}
              onChange={handleNumericChange}
              label="nbr_jour_tt"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
             <TextField
            required
              variant="outlined"
              color="info"
              name="nbr_jour_sur_site"
              value={numericValue2}
              onChange={handleNumericChange2}
              label="nbr_jour_sur_site"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
             {showOtherField && (
              <div>
      
     <TextField
       required
       name='kmJour'
       variant="outlined"
       label="Kilomètres par jour"
       value={formData.kmJour}
       onChange={handleInputChange}
       type="number"
       inputProps={{ step: '0.01' }}
     />
     <br />
     <TextField
     disabled
     name='fraiskm'
       required
       variant="outlined"
       label="Frais par kilomètre"
       value={formData.fraiskm}
      //  onChange={handleInputChange}
      
     />
     </div>
      )}
           <Button onClick={handleSubmit} color="info" variant="contained" sx={{ mt: 3, ml: 10 }}>
          Submit
        </Button>
        </div>
        </Formik>
        </Box>

)


}
export default AjoutODM;
