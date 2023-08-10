import { useState, useEffect } from 'react';


const useProjetModel = () => {
    const [projets, setProjets] = useState([]);
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('/ListeProjets');

      if (response.ok) {
        const jsonData = await response.json();
        const rowsWithEntreprise = jsonData.map((row) => ({
            ...row,
            entreprise: {
              ...row.entreprise,
              nomentreprise: row.entreprise?.nomentreprise || '',
            },
          }));
          // Add a unique 'id' property to each row
          const rowsWithIds = rowsWithEntreprise.map((row, index) => ({ ...row, id: index + 1 }));
          setProjets(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const getDataById = (id) => {
    const row = projets.find((row) => row.id === id);
    return row ? row : null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { projets, data, getDataById };
};

export default useProjetModel;