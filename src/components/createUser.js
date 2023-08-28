import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
} from "@mui/material";

const NewMovieForm = ({ open, handleClose, handleCreateMovie }) => {
    // State to manage form data
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    directorName: "",
    releaseDate: "",
    description: "",
  });

    // Handling input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
        // Updating the form data state with the changed input
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateMovie(formData); // Passing the form data to the parent component
    handleClose(); // Closing the modal after submitting
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          width: "90%", // Using percentage for responsiveness
          maxWidth: 800, 
          borderRadius: 8,
          textAlign: "center",
          overflow: "auto",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Create New Movie</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Image URL"
                  variant="outlined"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Director Name"
                  variant="outlined"
                  name="directorName"
                  value={formData.directorName}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Released Date"
                  variant="outlined"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Plot"
                  variant="outlined"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create Movie
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Modal>
  );
};

export default NewMovieForm;
