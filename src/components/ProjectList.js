import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const sortedRows = [...projects].sort((a, b) => b.id_p - a.id_p);
 
  useEffect(() => {
    // Fetch employee data from the backend API
    fetch('/ListePrjets')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);


  return (
    <div>
      <h1>Project List</h1>
      <Table >
        <TableHead>
          <TableRow>
            
            <TableCell>ID</TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            {/* Add more table headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody >
          {sortedRows.map((project) => (
            <TableRow key={project.id} >
              <TableCell>{project.id_p}</TableCell>
              <TableCell>{project.titre}</TableCell>
              <TableCell>{project.description}</TableCell>
           
              {/* Add more table cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
