import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
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
import { format, parseISO } from 'date-fns';


const ModifUser=()=>{
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const [isValid, setIsValid] = useState(true);
  const [showTextField, setShowTextField] = useState(false);
  const navigate = useNavigate();
  // const[file,setFile]=useState('')
  // const [imageUrl, setImageUrl] = useState('');
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState('');
  const [endpoint, setEndpoint] = useState('');
    const [formData, setFormData] = useState({
      id_c:"",
      etat: "Activé",
      adresse_c: "",
      cin_c: "",
      ddn_c: "",
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
      entreprise:{id_e:""}
      });
      

  useEffect(() => {
    const fetchDataget = async () => {
      try {
        console.log('the id '+id)
        const response = await fetch(`/CompteById/${id}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataget();
  }, [id]);
  useEffect(() => {
    
    if (data) {
      const parsedDate = new Date(data.ddn_c); // Use the Date constructor to parse the date string
      const formattedDate = format(parsedDate, 'yyyy-MM-dd');
      console.log(data.ddn_c);
      const newEndpoint = getEndpoint(data.roles);
    setEndpoint(newEndpoint); // Call getEndpoint after updating the formData state
    console.log('newEndpoint:', newEndpoint);
    console.log('Endpoint:', endpoint);
    setShowTextField(data.roles === "Consultant" || data.roles === "Manager");
     
      if(data.roles=="Manager_Client"){
      setFormData((prevFormData) => ({
        ...prevFormData,
        id_c: data.id_c,
        etat: data.etat,
        adresse_c: data.adresse_c,
        cin_c: data.cin_c,
        ddn_c: data.formattedDate,
        emailc: data.emailc,
        mdp_c: data.mdp_c,
        nom_c: data.nom_c,
        num_tel_c: data.num_tel_c,
        pole_c: data.pole_c,
        post_c: data.post_c,
        prenom_c: data.prenom_c,
        sexe_c: data.sexe_c,
        soldecongémaladie: data.soldecongémaladie,
        solde_congé_payé: data.solde_congé_payé,
        roles: data.roles,
        entreprise: { id_e: data.entreprise.id_e },
      }));
    } else{
      setFormData((prevFormData) => ({
        ...prevFormData,
        id_c: data.id_c,
        etat: data.etat,
        adresse_c: data.adresse_c,
        cin_c: data.cin_c,
        ddn_c: data.formattedDate,
        emailc: data.emailc,
        mdp_c: data.mdp_c,
        nom_c: data.nom_c,
        num_tel_c: data.num_tel_c,
        pole_c: data.pole_c,
        post_c: data.post_c,
        prenom_c: data.prenom_c,
        sexe_c: data.sexe_c,
        soldecongémaladie: data.soldecongémaladie,
        solde_congé_payé: data.solde_congé_payé,
        roles: data.roles,
      }));
    }
    }
  }, [data]);
      
     
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

  // if (name === "photo_c") {
  //   const file = e.target.files[0];
  //   setFile(file);

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const imageUrl = reader.result;
  //     setImageUrl(imageUrl);
  //   };
  //   reader.readAsDataURL(file);
  // } else {
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
              return '/modifConsultant';
            case 'Service_Manager':
              return '/ajouter_SM';
            case 'RH':
              return '/modifRH';
            case 'Manager_Inetum':
              return '/modifMI';
            case 'Manager_Client':
              return '/MC/modifMC';
            default:
              return '';
          }
        }
    
        const handleSubmit = (event) => {
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
            entreprise:{id_e:formData.entreprise.id_e}
          }
      
          console.log('the endpoin in the fetch is ',endpoint)
          console.log('the AccountData in the fetch is ',AccountData.emailc);
            // Effectuer la requête POST avec l'endpoint approprié
            fetch(`${endpoint}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(AccountData ),
            })
              .then((response) => response.json())
              .then((data) => {
                // Traiter la réponse de la requête
                console.log(data);
              })
              .catch((error) => {
                // Gérer les erreurs
                console.error(error);
              });
               navigate('/Consultants'); 
            
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
  name="id_c"

  value={data.idc}

  inputProps={{
    pattern: '[0-9]*',
    maxLength: 4
  }}
  onChange={handleChange2}
  label="Matricule"
  InputLabelProps={{
    shrink: true
  }}
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
      value={data.formattedDate}
      // renderInput={(params) => <TextField {...params} />}
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

   
      {/* <Input 
        type="file"
        name="photo_c"
        onChange={handleInputChange}
        color='primary'
        inputProps={{ style: { display: 'none' } }}
        id="file-upload"
      />
       <label htmlFor="file-upload">
        <Button  sx={{mt:3}} variant="contained" component="span" startIcon={<CloudUploadOutlinedIcon />}color='secondary'>
          Browse
        </Button>
        {formData.photo_c && <p>photo: {formData.photo_c.name}</p>}
      </label> */}
   
      <AccountTypeSelect  onSelect={handleSelect} onSetOPtion={handleSelect2} selected={formData.roles}/>
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
export default ModifUser;