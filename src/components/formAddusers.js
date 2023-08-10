import React, { useState } from 'react';
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
 } from '@mui/material';
import NumericTextField from './NumericTextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AccountTypeSelect from './TypeDeCompte'
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Formadd=({url})=>{
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [showTextField, setShowTextField] = useState(false);
  const navigate = useNavigate();
  // const[file,setFile]=useState('')
  // const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [endpoint, setEndpoint] = useState('');
    const [formData, setFormData] = useState({
      id_c:"",
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
      // photo_c: null,
      roles: "",
      entreprise:{id_e:""},
      servicemanager:{id_c:""}
      });
      const [value, setValue] = useState('');
     
      const handleChange =(event)=>{
        const {name,value} = event.target;
        setFormData({
          ...formData,
          [name]: value,

      })
      
    }
      const handleChange2 = (event) => {
        const inputValue = event.target.value;
    
        // Remove any non-digit characters
        const cleanedValue = inputValue.replace(/\D/g, '');
    
        // Restrict the input to four digits
        const truncatedValue = cleanedValue.slice(0, 4);
    
        setValue(truncatedValue);
        setFormData({
          ...formData,
          id_c: truncatedValue,
        });
      };

      
      const handleChangeemail = (e) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setFormData({
          ...formData,
          emailc: inputEmail,
        });
    
        // Validation de l'email
        const emailRegex =/^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{1,7}$/;
        const isValidEmail = emailRegex.test(email);
        setIsValid(isValidEmail);
      };
      const handleInputChange = (e) => {
       const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  // }
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
    console.log(formData.cin_c);
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
    console.log(formData.cin_c);
  }
};
const handleInputChangeddn = (date) => {
  
  setFormData({
    ...formData,
    ddn_c: date,
  });
  // Additional logic or actions with the selected date
};
const handleSelect2 = (value) => {
  console.log('Selected value:', value);
  setFormData({
    ...formData,
    entreprise:{id_e:value}
  });
}

        const handleSelect = (value) => {
          console.log('Selected value:', value);
          setFormData({
            ...formData,
            roles: value,
          });
          const newEndpoint = getEndpoint(value);
          setEndpoint(newEndpoint); // Call getEndpoint after updating the formData state
          console.log('newEndpoint:', newEndpoint);
          console.log('Endpoint:', endpoint);
          setShowTextField(value === "Consultant" || value === "Manager_Client" || value === "Manager_Inetum");
    
    
   
        };
      
        const getEndpoint = (selectedRole) => {
          console.log('in the getendpoint and the passed value is ' +selectedRole)
          switch (selectedRole) {
            case 'Consultant':
              return '/api/set-profile';
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
        }
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
        const handleSubmit = async (event) => {
          event.preventDefault();
          
          const AccountData = {
            id_c:formData.id_c,
            etat: formData.etat,
            adresse_c: formData.adresse_c,
            cin_c: formData.cin_c,
            ddn_c: formData.ddn_c,
            emailc: formData.emailc,
            mdp_c: formData.mdp_c,
            nom_c: formData.nom_c,
            num_tel_c: formData.num_tel_c,
            pole_c: formData.pole_c,
            post_c: formData.post_c,
            prenom_c: formData.prenom_c,
            sexe_c: formData.sexe_c,
            soldecongémaladie: 5.0,
            solde_congé_payé: 8.0,
            // photo_c:  imageUrl,
            roles: formData.roles,
            entreprise:{id_e:formData.entreprise.id_e},
            servicemanager:{id_c:formData.servicemanager.id_c}
          }
      try{
          console.log('the endpoin in the fetch is ',endpoint)
          console.log('the AccountData in the fetch is ',AccountData.emailc);
            // Effectuer la requête POST avec l'endpoint approprié
            const response = await  fetch(`${endpoint}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(AccountData ),
            })

            if (response.ok) {
              // Handle successful submission
              console.log('Data submitted successfully');
              handleNotification();
              navigate("/Consultants")
            } else {
              throw new Error('Error submitting data');
            }
  
          } catch(error){
                // Gérer les erreurs
                console.error(error);
                toast.error( 'opération invalide', {
                  position: "top-right",
                      autoClose: false, // Disable auto close
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                });
              };
              
            
        };
     

return (
 
  <Box 
  component="form"
  sx={{
    '& .MuiTextField-root': { mt:1,mb:1,mr:5,ml:10, width: '50ch' },
    '& .MuiRadioGroup-root':{ml:10},
  
    '& .MuiFormControlLabel-root':{ml:10},
    // '& .MuiInputLabel-root':{ml:10},
    '& .MuiInput-root':{ mt:3,ml:10}
    
  }}
  noValidate
  autoComplete="off"
>
<h2 style={{marginLeft:20}}>Ajouter compte</h2>
    <Formik onSubmit={handleSubmit}>
      <div>
      <div>
      <TextField
      variant="outlined"
       color="info"
        // type="text"
        name="id_c"
        value={formData.id_c}
        inputProps={{
          pattern: '[0-9]*',
          maxLength:4
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
        helperText={errorMessage}/>
  
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
        helperText={errorMessage}/>

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
        error={!isValid} // Affiche une erreur si l'email n'est pas valide
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
      label= "Date de Naissance"
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
      <FormLabel id="demo-form-control-label-placement" sx={{ml:10,mt:3}}>Sexe</FormLabel>
      <RadioGroup
      value={formData.sexe_c}
        onChange={handleChange}
        row
        aria-labelledby="demo-form-control-label-placement"
        name="sexe_c"
        //  defaultValue="Homme"
      >
          <FormControlLabel value="Homme" name="sexe_c" control={<Radio color='info'  />} label="Homme" />
        <FormControlLabel value="Femme" name="sexe_c" control={<Radio  color='info'/>} label="Femme" />
      </RadioGroup>
    </FormControl>
    </Grid>
     <Grid item>
      <FormControl>
      <FormLabel id="demo-form-activation" sx={{ml:10,mt:3}}>Etat de compte</FormLabel>
      <RadioGroup
        onChange={handleChange}
        row
        aria-labelledby="demo-form-control-label-placement"
        name="position"
        defaultValue="Activé"
        
      >
          <FormControlLabel value="Activé" control={<Radio color='info' disabled={true} />} label="Activé" />
        <FormControlLabel value="Désactivé" control={<Radio  color='info'disabled={true}/>} label="Désactivé" />
      </RadioGroup>
    </FormControl>
    </Grid>
    </Grid>
    </div>
    <div>


   
      <AccountTypeSelect  onSelect={handleSelect} onSetOPtion={handleSelect2}/>
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
      <div>
      <Button onClick={handleSubmit} color="info" variant="contained"sx={{mt:3,ml:10}} >Submit</Button>
      </div>
      </div>
    </Formik>
    </Box>
  );
};
export default Formadd;