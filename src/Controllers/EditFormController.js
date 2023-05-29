import React from 'react';
import EditFormView from '../Views/EditFormView';
import useEditFormModel from '../Models/EditFormModel';
import { putData } from '../Api';

const EditFormController = ({ isOpenEdit, onCloseEdit, selectedData, onDataChange }) => {
  const formModel = useEditFormModel(selectedData);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const modifiedData = {
      id_e: selectedData.id_e,
      nomentreprise: formModel.nomentreprise,
      pays: formModel.pays,
      adresse: formModel.adresse,
    };

    try {
      const response = await putData('/ModifierEntreprise', modifiedData);
      if (response.ok) {
        // Handle successful submission
        console.log('Data submitted successfully');
        onCloseEdit(); // Close the dialog box
        window.location.reload(); // Refresh the page
      } else {
        throw new Error('Error submitting data');
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting data:', error);
    }
  };

  return (
    <EditFormView
      isOpenEdit={isOpenEdit}
      onCloseEdit={onCloseEdit}
      selectedData={selectedData}
      handleSubmit={handleSubmit}
      {...formModel}
    />
  );
};

export default EditFormController;
