import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const CongePieChart = () => {
  const [congeData, setCongeData] = useState([]);

  useEffect(() => {
    // Make an API call to fetch "congé" data from your backend
    axios.get('/Conge/showAll')
      .then((response) => {
        const fetchedData = response.data;

        // Set the fetched "congé" data in state
        setCongeData(fetchedData);
      })
      .catch((error) => {
        console.error('Error fetching "congé" data:', error);
      });
  }, []);

  const calculateDistribution = () => {
    const etatCounts = {};
    congeData.forEach((conge) => {
      const { etat } = conge;
      if (etatCounts[etat]) {
        etatCounts[etat]++;
      } else {
        etatCounts[etat] = 1;
      }
    });

    // Generate an array of unique "etat" values
    const uniqueEtats = Object.keys(etatCounts);

    // Create an array of colors using a color scale or predefined colors
    // In this example, we use a predefined array of colors
    const colors = ['#00ab9b', '#232c4b', '#a9ddd6', '#404a6a', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

    // Map unique "etat" values to colors
    const data = uniqueEtats.map((etat, index) => ({
      name: etat,
      value: etatCounts[etat],
      fill: colors[index % colors.length], // Use a modulo operation to repeat colors if needed
    }));
    return data;
  };

  const filteredData = calculateDistribution();

  return (
    <Paper>
      <Typography variant="h6">Congé Status Distribution</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie dataKey="value" data={filteredData} cx="50%" cy="50%" outerRadius={100} label />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CongePieChart;
