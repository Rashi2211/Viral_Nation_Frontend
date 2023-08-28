import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../../src/styles.css";

const CardComponent = ({
  directorName,
  releaseDate,
  image,
  title,
  description,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <div className="scrollable"> {/* Scrollable container for cards */}
      <Card
        variant="outlined"
        sx={{ position: "relative", overflow: "visible" }} // Custom styling for the card
      >
        <CardMedia
          component="img"
          height="140"
          image={image} // Image URL for the card
          alt={title}   // Alt text for the image
        />
        <CardContent>
          <Box sx={{ position: "absolute", right: 0 }}> {/* Position icons to the right and below the image*/}
            {/* Icon button for editing */}
            <IconButton onClick={handleEditClick} color="primary" size="small">
              <EditIcon fontSize="small" />
            </IconButton>
            {/* Icon button for deleting */}
            <IconButton onClick={handleDeleteClick} color="error" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography gutterBottom variant="h6" component="div">
            {title} {/* Movie title */}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {directorName} {/* Director's name */}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            {releaseDate} {/* Release date */}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description} {/* Movie description */}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
