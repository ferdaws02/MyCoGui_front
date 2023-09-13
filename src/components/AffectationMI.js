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
import SelectConsultant from './SelectConsultant'
import SelectProjet from './SelectProjets';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { postData } from '../Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SelectMI from './SelectMI';

const AffMI=()=>{
  const [consultant, setConsultant] = useState('');
  const [manager, setManager] = useState('');


    const [formData, setFormData] = useState({
       id:{
        consultant_id:"",
        manager_id:""
       },
       aff_date:null
      
      });
      const [value, setValue] = useState('');
 
      const handleOptionChange = (event) =>{
   
          setConsultant(event.target.value);

        // onSetOPtion(event.target.value)
      }
      const handleOptionChangeMI = (event) =>{
   
        setManager(event.target.value);

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
  
     



const handleSubmit = async (event) => {
  event.preventDefault();
  const ClientData = {
    id:{
      consultant_id:consultant,
      manager_id:manager
     },
     aff_date:formData.aff_date
    
    }
    console.log("the aff "+ClientData.data)

  try {
    const response = await postData('/affectations/affectation_MI',ClientData);

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
<h5 style={{marginLeft:20,marginTop:20}}>Ajouter Affectation MI</h5>
    <Formik   >
     
      <div>
        <div>
      <SelectConsultant  selectedOption={consultant} handleOptionChange={handleOptionChange}/>
      <SelectMI selectedOption={manager} handleOptionChange={handleOptionChangeMI}/>
     
     </div>
    <div>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker  
      label= "Date début"
      onChange={(date) => handleInputChangeddn("aff_date",date) }
      name="aff_date"
      value={formData.aff_date}
      renderInput={() => <TextField />}
    />
      </LocalizationProvider>
    </div>

   
    <div>
      <Button onClick={handleSubmit} color="info" variant="contained"sx={{mt:3,ml:10}} >Submit</Button>
      </div>
      </div>
    </Formik>
    </Box>
  );
};
export default AffMI;