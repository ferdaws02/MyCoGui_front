// FormPopupController.js

import React from 'react';
import FormPopupView from '../Views/FormPopupView';
import useFormModel from '../Models/FormModel';

const FormPopupController = ({ isOpen, onClose }) => {
  const formModel = useFormModel();

  const handleSubmit = (event) => {
    event.preventDefault();

    const clientData = {
      nomentreprise: formModel.nomentreprise,
      adresse: formModel.adresse,
      pays: formModel.pays,
    };

    fetch('/ajouter_Entreprise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientData),
    })
      .then((response) => {
        if (response.ok) {
          // Handle successful submission
          console.log('Data submitted successfully');
          formModel.resetForm();
          onClose(); // Close the dialog box
          window.location.reload(); // Refresh the page
        } else {
          throw new Error('Error submitting data');
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error submitting data:', error);
      });
  };

  return <FormPopupView {...formModel} isOpen={isOpen} onClose={onClose} handleSubmit={handleSubmit} />;
};

export default FormPopupController;
