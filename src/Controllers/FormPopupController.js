// FormPopupController.js

import React from 'react';
import FormPopupView from '../Views/FormPopupView';
import useFormModel from '../Models/FormModel';
import { postData } from '../Api';

const FormPopupController = ({ isOpen, onClose }) => {
  const formModel = useFormModel();
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const clientData = {
      nomentreprise: formModel.nomentreprise,
      adresse: formModel.adresse,
      pays: formModel.pays,
    };
  try {
    const response = await postData('/ajouter_Entreprise', clientData);
    if (response.ok) {
      // Handle successful submission
      console.log('Data submitted successfully');
      formModel.resetForm();
      onClose(); // Close the dialog box
      window.location.reload();
    } else {
      throw new Error('Error submitting data');
    }
  } catch (error) {
    // Handle error
    console.error('Error submitting data:', error);
  }
  };

  return <FormPopupView {...formModel} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} />;
};
export default FormPopupController;
