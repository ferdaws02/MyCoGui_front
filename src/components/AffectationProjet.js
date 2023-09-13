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
 import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SelectConsultant from '../components/SelectConsultant'
import SelectProjet from '../components/SelectProjets';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { putData } from '../Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AffMI from './AffectationMI';
const AffProjet=({url})=>{
  const [consultant, setConsultant] = useState('');
  const [projet, setProjet] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [formData, setFormData] = useState({
     consultant:{idc:""} ,
      projet:{id_p:""},
      ddaff_projet:null,
      dfaff_projet:null,
      entreprise:{idc:""}
    
    });
      const [value, setValue] = useState('');
 
      const handleOptionChange = (event) =>{
   
          setConsultant(event.target.value);

        // onSetOPtion(event.target.value)
      }

      const handleNotification = () => {
        // Show the toast notification

        toast.success('affectation valider', {

          position: "top-right",
          autoClose: false, // Disable auto close
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined, // Use the default progress bar
        });
    
        // Reload the page after a delay of 3 seconds (adjust as needed)
        // setTimeout(() => {
        //   window.location.reload();
        // }, 3000);
      };

      const handleInputChangeddn = (datePickerKey, date) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [datePickerKey]: date,
        }));
    
        // Additional logic or actions with the selected date
      };
  
     
const handleOptionChange2 = (event) => {

 
  setProjet(event.target.value);
};
const handleOptionChangeMc= (event) => {

 
  setEntreprise(event.target.value);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const ClientData = {
    consultant: { idc: consultant },
    projet: { id_p: projet },
    ddaff_projet: formData.ddaff_projet,
    dfaff_projet: formData.dfaff_projet,
    entreprise:{idc:entreprise}
  };

  try {
    const response = await putData('/affectations/affectationProjet', ClientData);

    if (response.ok) {
      // Handle successful submission
      console.log('Data submitted successfully');
      handleNotification();
    } else {
      throw new Error('Error submitting data');
    }
  } catch (error) {
    // Handle error and display an error toast notification
    console.error('Error submitting data:', error.message);

    toast.error( 'opération invalide', {

      position: "top-right",
          autoClose: false, // Disable auto close
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
    });
  }
};




    

return (
 
  <Box 
  component="form"
  sx={{
    '& .MuiTextField-root': {mt:1,mb:1,mr:13,ml:10, width: '50ch'},
    '& .MuiRadioGroup-root':{ml:10},
  
    '& .MuiFormControlLabel-root':{ml:10},
    // '& .MuiInputLabel-root':{ml:10},
    '& .MuiInput-root':{ mt:3,ml:10}
    
  }}
  noValidate
  autoComplete="off"
>
<h2 style={{marginLeft:20}}>Ajouter Affectation</h2>
<h5 style={{marginLeft:20 ,marginTop: 20}}>Ajouter Affectation Projet et MC </h5>
    <Formik   >
     
      <div>
       
    <div>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker  
      label= "Date début"
      onChange={(date) => handleInputChangeddn("ddaff_projet",date) }
      name="ddaff_projet"
      value={formData.ddaff_projet}
      renderInput={() => <TextField />}
    />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker 
      label= "Date fin"
      onChange={(date) => handleInputChangeddn("dfaff_projet",date)}
      name="dfaff_projet"
      value={formData.dfaff_projet}
      renderInput={() => <TextField />}
    />
      </LocalizationProvider>
    </div>
    <div>
      <SelectConsultant  selectedOption={consultant} handleOptionChange={handleOptionChange}/>
      <SelectProjet selectedOption={projet}  handleOptionChange={handleOptionChange2}handleOptionMCChange={handleOptionChangeMc}/>
     
     </div>
   
    <div>
      <Button onClick={handleSubmit} color="info" variant="contained"sx={{mt:3,ml:10}} >Submit</Button>
      </div>
      </div>
    </Formik>
    {/* <AffMI/> */}
    </Box>
  );
};
export default AffProjet;