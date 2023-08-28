import React from 'react';
import { Grid } from '@mui/material';
import CardComponent from './cardComponent';

const CardsGrid = ({ data, handleDeleteClick, handleEditClick}) => {

  return ( 
    <Grid container spacing={4} > {/* Container to hold grid of cards */}
        {data.map((card) => (
          <Grid item xs={12} sm={6} md={4}key={card.id}> {/* Each card in a grid item */}
            <CardComponent
              image={card.image} // Passing image URL to CardComponent
              id={card.id} // Passing card ID
              directorName={card.directorName} // Passing director's name
              releaseDate={card.releaseDate} // Passing release date
              title={card.name} // Passing movie title
              description={card.description} // Passing movie description
              handleEditClick={() => handleEditClick(card)} // Attaching edit click handler
              handleDeleteClick={() => handleDeleteClick(card)} // Attaching delete click handler
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default CardsGrid;
