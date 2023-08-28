import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { EDIT_MOVIES } from "../queries/Edit";

const EditUser = ({ open, handleClose, editingCard, handleUpdateCard }) => {
  // State to manage the updated card data
  const [editMovie] = useMutation(EDIT_MOVIES);
  const [updatedCard, setUpdatedCard] = useState({
    image: editingCard ? editingCard.image : "",
    id: editingCard ? editingCard.id : null,
    title: editingCard ? editingCard.name : "",
    description: editingCard ? editingCard.description : "",
    directorName: editingCard ? editingCard.directorName : "",
    releaseDate: editingCard ? editingCard.releaseDate : "",
  });

  useEffect(() => {
    // Updating the state when editingCard changes
    setUpdatedCard({
      image: editingCard ? editingCard.image : "",
      id: editingCard ? editingCard.id : null,
      title: editingCard ? editingCard.name : "",
      description: editingCard ? editingCard.description : "",
      directorName: editingCard ? editingCard.directorName : "",
      releaseDate: editingCard ? editingCard.releaseDate : "",
    });
  }, [editingCard]);

  // Handling input changes in the form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  // Handling saving changes to the edited card
  const handleSaveChanges = async () => {
    try {
      console.log("Updated Card: line 47", updatedCard);
      const { data } = await editMovie({
        variables: {
          idToUpdated: updatedCard.id, // Using idToUpdated to identify the card to be updated
          name: updatedCard.title,
          description: updatedCard.description,
          directorName: updatedCard.directorName,
          releaseDate: updatedCard.releaseDate,
          image: updatedCard.image,
        },
      });
      handleUpdateCard(data.editMovie); // Updating the card with edited data
      handleClose(); // Closing the edit dialog
    } catch (error) {
      console.error("Error editing movie:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Card</DialogTitle>
      <DialogContent>
        {/* Input fields for editing the card */}

        <TextField
          label="Image URL"
          name="image"
          value={updatedCard.image}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Title"
          name="title"
          value={updatedCard.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={updatedCard.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Director Name"
          name="directorName"
          value={updatedCard.directorName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Release Date"
          name="releaseDate"
          value={updatedCard.releaseDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        {/* Button to cancel editing */}

        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {/* Button to confirm and save changes */}

        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
