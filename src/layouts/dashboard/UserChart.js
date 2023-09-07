import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const UserChart = () => {
  const [roleCounts, setRoleCounts] = useState([]);

  useEffect(() => {
    // Make an API call to your backend to fetch user data
    axios
      .get('/ListeComptes')
      .then((response) => {
        const userData = response.data;

        // Calculate counts for each role
        const roles = ['Consultant', 'RH', 'Manager_Inetum','Manager_Client'];
        const counts = roles.map((role) => {
          const roleCount = userData.filter((user) => user.roles === role).length;
          return { role, count: roleCount };
        });

        setRoleCounts(counts);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle the error appropriately
      });
  }, []);

  // Log the roleCounts data for debugging
  useEffect(() => {
    console.log('roleCounts:', roleCounts);
  }, [roleCounts]);

  return (
    <Paper>
      <Typography variant="h6">Number of Users by Role</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={roleCounts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="role" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Map over roleCounts and create a Bar for each role */}
          <Bar key="role" dataKey="count" fill={`rgba(4,156,140, 0.8)`} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default UserChart;
