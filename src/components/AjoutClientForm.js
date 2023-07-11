import React, { useState } from 'react';
import { 
  TextField, 
  Box,
  Button,
 } from '@mui/material';
import { Formik } from 'formik';
import { postData } from '../Api';
import { CenterFocusStrong } from '@mui/icons-material';


const AjoutClient=()=>{
    const [formData, setFormData] = useState({
        nomentreprise:"",
        adresse: "",
        pays: ""
    });
    
        
    const handleInputChange =(e)=>{
        const { name, value } = e.target;
        if(name==='nomentreprise'){
        setFormData({
            ...formData,
            nomentreprise: value,
          })
        }else if(name==='adresse'){
          setFormData({
            ...formData,
            adresse: value,
          })
        }else if(name==='pays'){
          setFormData({
            ...formData,
            pays: value,
          })
        }

    }
    
    const handleSubmit=(event)=>{
        event.preventDefault();
          
        const ClientData = {
            nomentreprise:formData.nomentreprise,
            adresse:formData.adresse,
            pays: formData.pays}
            
            
              console.log('ClientData '+ClientData)
                const response =  postData('/ajouter_Entreprise', ClientData);
                console.log(response)
                if (response.ok) {
                  // Handle successful submission
                  console.log('Data submitted successfully');
                 
                  window.location.reload();
                } else {
                  throw new Error('Error submitting data');
                }
              

    }
    return (
    <Box 
    component="form"
    sx={{
      '& .MuiTextField-root': { mt:1,mb:1,mr:5,ml:50, width: '50ch' },
      '& .MuiFormControlLabel-root':{ml:10},
      '& .MuiInput-root':{ mt:3,ml:10}
      
    }}
    noValidate
    autoComplete="off"
  >
  <h2 style={{marginLeft:20,position:CenterFocusStrong}}>Ajouter Client</h2>
      <Formik onSubmit={handleSubmit}>
        <div>
        <div>
            <TextField
        variant="outlined"
        color="info"
        type="text"
        name="nomentreprise"
        value={formData.nomentreprise}
        onChange={handleInputChange}
        label="nom entreprise"
      />
      </div>   
      <div>
      <TextField
        variant="outlined"
        color="info"
        type="text"
        name="adresse"
        value={formData.adresse}
        onChange={handleInputChange}
        label="adresse"
      /></div>
      <div>
      <TextField
        variant="outlined"
        color="info"
        type="text"
        name="pays"
        value={formData.pays}
        onChange={handleInputChange}
        label="pays"
      />
      </div>
       <div>
      <Button onClick={handleSubmit} color="info" variant="contained"sx={{mt:3,ml:65}} >Submit</Button>
      </div>
      </div>
      </Formik>
    
            </Box>
    );
};
export default  AjoutClient;