

import React from 'react';
import EditFormPopupView from '../Views/EditRormView';
import useEditFormModel from '../Models/EditFormModel';

const EditFormController = ({ isOpenEdit, onCloseEdit }) => {
const [nomentreprise, setNomentreprise] = useState('');
const [pays, setPays] = useState('');
const [adresse, setAdresse] = useState('');
useEffect(() => {
    if (selectedData) {
      setNomentreprise(selectedData.nomentreprise);
      setPays(selectedData.pays);
      setAdresse(selectedData.adresse);
    }
  }, [selectedData]);

   
    const handleSubmit = (event) => {
      event.preventDefault();
      const modifiedData = {
        id_e: selectedData.id_e,
        nomentreprise,
        pays,
        adresse
      };
      fetch('/ModifierEntreprise', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData),
      })
        .then(response => {
          if (response.ok) {
            // Handle successful submission
            console.log('Data submitted successfully');
            onCloseEdit(); // Close the dialog box
            window.location.reload(); // Refresh the page
           
          } else {
            throw new Error('Error submitting data');
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error submitting data:', error);
        });
       
    };
    return <EditFormPopupView {...formModel} isOpenEdit={isOpenEdit} onCloseEdit={onCloseEdit} handleSubmit={handleSubmit} />;
};