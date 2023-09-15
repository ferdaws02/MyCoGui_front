import React, { useState } from 'react';

const OrderMissionForm = () => {
  const [formData, setFormData] = useState({
    debutodm: '',
    finodm: '',
    description_odm: '',
    nbr_jour_tt: '',
    nbr_jour_sur_site: '',
    consultantsOdm: {
      idc: '',
    },
    nbrJRSURsit: '',
    kmJour: '',
    fraiskm: '',
    somme: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Effectuez une requête POST vers votre API avec les données formData
    fetch('URL_DE_VOTRE_API/ajouter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Affichez la réponse de l'API
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Formulaire d'ordre de mission</h2>
      <form onSubmit={handleSubmit}>
        {/* Ajoutez ici les champs de formulaire pour les données de l'ordre de mission et de la note de frais */}
        {/* Assurez-vous d'ajouter des éléments de formulaire contrôlés avec des noms correspondants */}

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default OrderMissionForm;
