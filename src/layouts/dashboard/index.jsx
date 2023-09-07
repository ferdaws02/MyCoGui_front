import { tokens } from "../../theme";
import {  useTheme } from "@mui/material";
import React from 'react';
import UserChart from "./UserChart";
import CongePieChart from './CongePieChart';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (<div>
    <h1>Dashboard</h1>
    <UserChart />
    <CongePieChart/>{/* Add the UserChart component here */}
    {/* Add other components as needed */}
  </div>);
};

export default Dashboard;