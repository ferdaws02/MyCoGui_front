// FormPopupController.js

import React from 'react';
import FormPopupViewProjet from '../Views/FormPopupViewProjet';
import useFormModel from '../Models/FormModelProjet';
import { postData } from '../Api';

const FormPopupProjectController = ({ isOpen, onClose }) => {
  const formModel = useFormModel();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const projetData = {
     description: formModel.description,
     titre: formModel.titre,
     entreprise: {
      nomentreprise: formModel.entreprise_id_e
    },
    };
  try {
    const response = await postData('/ajoutProjet', projetData);
    if (response.ok) {
      // Handle successful submission
      console.log('Data submitted successfully '+projetData.entreprise.nomentreprise);
      formModel.resetForm();
      onClose(); // Close the dialog box
      window.location.reload();
    } else {
      throw new Error('Error submitting data '+projetData.entreprise.entreprise_id_e);
    }
  } catch (error) {
    // Handle error
    console.error('Error submitting data:', error);
  }
  };

  return <FormPopupViewProjet {...formModel} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} />;
};
export default FormPopupProjectController ;
