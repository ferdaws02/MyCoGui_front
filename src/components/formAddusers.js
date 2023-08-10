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
import AccountTypeSelect from './TypeDeCompte';
import { Formik } from 'formik';

const Formadd = ({ url }) => {

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [showTextField, setShowTextField] = useState(false);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [formData, setFormData] = useState({
    idc: "",
    etat: "Activé",
    adresse_c: "",
    cin_c: "",
    ddn_c: null,
    emailc: "",
    mdp_c: "",
    nom_c: "",
    num_tel_c: "",
    pole_c: "",
    post_c: "",
    prenom_c: "",
    sexe_c: "Homme",
    soldecongémaladie: 5.0,
    solde_congé_payé: 8.0,
    photo_c: null,
    roles: "",
    entreprise: { id_e: "" }
  });
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleChange2 = (event) => {
    const inputValue = event.target.value;
    const cleanedValue = inputValue.replace(/\D/g, '');
    const truncatedValue = cleanedValue.slice(0, 4);
    setValue(truncatedValue);
    setFormData({
      ...formData,
      idc: truncatedValue,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const formDataToSend = new FormData();
    formDataToSend.append('photo_c', file);

    // Merge the existing form data with the file data
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        photo_c: file,
        formDataToSend
      };
    });
  };


  const handleChangeemail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setFormData({
      ...formData,
      emailc: inputEmail,
    });

    const emailRegex = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{1,7}$/;
    const isValidEmail = emailRegex.test(email);
    setIsValid(isValidEmail);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChangecin = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    if (name === "cin_c") {
      setFormData({
        ...formData,
        cin_c: numericValue,
      });
      if (/\D/.test(value)) {
        setErrorMessage("Seuls les chiffres sont autorisés.");
      } else {
        setErrorMessage("");
      }
    }
  
    if (name === "num_tel_c") {
      if (/\D/.test(value)) {
        setErrorMessage("Seuls les chiffres sont autorisés.");
      } else {
        setErrorMessage("");
      }
      setFormData({
        ...formData,
        num_tel_c: numericValue,
      });
    }
  };

  const handleInputChangeddn = (date) => {
    setFormData({
      ...formData,
      ddn_c: date,
    });
  };

  const handleSelect2 = (value) => {
    setFormData({
      ...formData,
      entreprise: { id_e: value }
    });
  };

  const handleSelect = (value) => {
    setFormData({
      ...formData,
      roles: value,
    });
    const newEndpoint = getEndpoint(value);
    setEndpoint(newEndpoint);
    setShowTextField(value === "Consultant" || value === "Manager_Client" || value === "Manager_Inetum");
  };

  const getEndpoint = (selectedRole) => {
    switch (selectedRole) {
      case 'Consultant':
        return '/ajouter_Consultant';
      case 'Service_Manager':
        return '/ajouter_SM';
      case 'RH':
        return '/ajouter_RH';
      case 'Manager_Inetum':
        return '/ajouter_MI';
      case 'Manager_Client':
        return '/MC/ajouter_MC';
      default:
        return '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append("Id_c", formData.idc);
    formDataToSend.append("etat", formData.etat);
    formDataToSend.append("adresse_c", formData.adresse_c);
    formDataToSend.append("cin_c", formData.cin_c);
    formDataToSend.append("ddn_c", formData.ddn_c);
    formDataToSend.append("emailc", formData.emailc);
    formDataToSend.append("mdp_c", formData.mdp_c);
    formDataToSend.append("nom_c", formData.nom_c);
    formDataToSend.append("num_tel_c", formData.num_tel_c);
    formDataToSend.append("pole_c", formData.pole_c);
    formDataToSend.append("post_c", formData.post_c);
    formDataToSend.append("prenom_c", formData.prenom_c);
    formDataToSend.append("sexe_c", formData.sexe_c);
    formDataToSend.append("soldecongémaladie", formData.soldecongémaladie);
    formDataToSend.append("solde_congé_payé", formData.solde_congé_payé);
    //formDataToSend.append("photo_c", formData.photo_c);
    formDataToSend.append("roles", formData.roles);
    formDataToSend.append("entreprise[id_e]", formData.entreprise.id_e);
    //formDataToSend.append("photo_c", selectedImage);

    // Append the image if it exists
   if (selectedImage) {
  formDataToSend.append("photo_c", selectedImage);
  }

    // Send the data to the server using fetch
    try {
      const response = await fetch("/ajouter_Consultant", {
        method: 'POST',
       
        body: formDataToSend, // Send the data as JSON

        //headers: {
          // Important: Set the Content-Type header to multipart/form-data
          //'Content-Type': 'multipart/form-data',
       //},

      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      //const data = await response.json();
      //console.log(data);
  
      navigate('/Consultants');
    } catch (error) {
      console.error(error);
    }
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
      <h2 style={{ marginLeft: 20 }}>Ajouter compte</h2>
      <Formik onSubmit={handleSubmit}>
        <div>
          <div>
            <TextField
              variant="outlined"
              color="info"
              name="Id_c"
              value={formData.idc}
              inputProps={{
                pattern: '[0-9]*',
                maxLength: 4
              }}
              onChange={handleChange2}
              label="Matricule"
            />
            <NumericTextField
              name={"cin_c"}
              placeholder="cin"
              value={formData.cin_c}
              handleInputChange={handleInputChangecin}
              error={errorMessage}
              helperText={errorMessage}
            />

            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="nom_c"
              value={formData.nom_c}
              onChange={handleInputChange}
              label="Nom"
            />
            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="prenom_c"
              value={formData.prenom_c}
              onChange={handleInputChange}
              label="Prenom"
            />

            <NumericTextField
              name={"num_tel_c"}
              placeholder="Contact"
              value={formData.num_tel_c}
              handleInputChange={handleInputChangecin}
              error={errorMessage}
              helperText={errorMessage}
            />

            <TextField
              variant="outlined"
              color="info"
              type="text"
              name="adresse_c"
              value={formData.adresse_c}
              onChange={handleInputChange}
              label="Address"
            />

            <TextField
              variant="outlined"
              color="info"
              type="email"
              name="emailc"
              value={formData.emailc}
              onChange={handleChangeemail}
              error={!isValid}
              helperText={!isValid ? 'Email invalide' : ''}
              label="Email"
            />
            <TextField
              variant="outlined"
              color="info"
              type="password"
              name="mdp_c"
              value={formData.mdp_c}
              onChange={handleInputChange}
              label="Mot de Passe"
            />
          </div>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date de Naissance"
              onChange={handleInputChangeddn}
              name="ddn_c"
              value={formData.ddn_c}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <div>
            <Grid container spacing={2}>
              <Grid item>
                <FormControl>
                  <FormLabel id="demo-form-control-label-placement" sx={{ ml: 10, mt: 3 }}>Sexe</FormLabel>
                  <RadioGroup
                    value={formData.sexe_c}
                    onChange={handleChange}
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="sexe_c"
                  >
                    <FormControlLabel value="Homme" name="sexe_c" control={<Radio color='info' />} label="Homme" />
                    <FormControlLabel value="Femme" name="sexe_c" control={<Radio color='info' />} label="Femme" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel id="demo-form-activation" sx={{ ml: 10, mt: 3 }}>Etat de compte</FormLabel>
                  <RadioGroup
                    onChange={handleChange}
                    row
                    aria-labelledby="demo-form-control-label-placement"
                    name="position"
                    defaultValue="Activé"
                  >
                    <FormControlLabel value="Activé" control={<Radio color='info' disabled={true} />} label="Activé" />
                    <FormControlLabel value="Désactivé" control={<Radio color='info' disabled={true} />} label="Désactivé" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </div>

          <div>
            <AccountTypeSelect onSelect={handleSelect} onSetOption={handleSelect2} />
            {showTextField && (
              <div>
                <TextField
                  variant="outlined"
                  color="info"
                  type="text"
                  name="post_c"
                  value={formData.post_c}
                  onChange={handleInputChange}
                  label="Post"
                />
                <TextField
                  variant="outlined"
                  color="info"
                  type="text"
                  name="pole_c"
                  value={formData.pole_c}
                  onChange={handleInputChange}
                  label="Pole"
                />
              </div>
            )}
          </div>
        </div>
      </Formik>

      <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
        ) : (
          <CloudUploadOutlinedIcon style={{ fontSize: '100px' }} />
        )}
        <InputLabel htmlFor="image-uploader" sx={{ mt: 2, cursor: 'pointer' }}>
          Change Image
        </InputLabel>
        <Input
          id="image-uploader"
          type="file"
          accept="image/*"
          name='photo_c'
          onChange={handleImageChange}
          sx={{ display: 'none' }}
        />
      </Box>

      <div>
        <Button onClick={handleSubmit} color="info" variant="contained" sx={{ mt: 3, ml: 10 }}>
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default Formadd;
