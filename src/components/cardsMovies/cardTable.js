import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TableSortLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CardsTable = ({ data, handleDeleteClick, handleEditClick }) => {
    // State to manage sorting configuration
  const [sortConfig, setSortConfig] = useState({ column: 'id', direction: 'asc' });

    // Function to request sorting based on column
  const requestSort = (column) => {
    const newDirection = sortConfig.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ column, direction: newDirection });
  };

    // Sorting data based on the sorting configuration
  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.column] < b[sortConfig.column]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.column] > b[sortConfig.column]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <TableContainer component={Paper}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h2>Movie List</h2>
        <Button onClick={() => requestSort('id')} variant="outlined" color="primary">
          Sort by ID
        </Button>
      </div>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              <TableSortLabel
                active={sortConfig.column === 'id'}
                direction={sortConfig.direction}
                onClick={() => requestSort('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Plot</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Director</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Released</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Edit</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((card) => (
            <TableRow key={card.id}>
              <TableCell>{card.id}</TableCell>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.description}</TableCell>
              <TableCell>{card.directorName}</TableCell>
              <TableCell>{card.releaseDate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(card)} color="primary">
                  <EditIcon />
                </IconButton>
                </TableCell>
                <TableCell>
                <IconButton onClick={() => handleDeleteClick(card)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CardsTable;
