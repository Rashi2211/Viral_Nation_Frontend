import React, { useEffect, useState } from "react";

import {
  Container,
  Button,
  Box,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  useTheme,
  MenuItem,
} from "@mui/material";
import CardsGrid from "./cardGrid";
import CardsTable from "./cardTable";
import SearchBar from "./search";
import EditUser from "../editUser";
import NewMovieForm from "../createUser";
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../queries/GetAllMovies";
import { CREATE_MOVIE } from "../../queries/CreateMovie";
import { EDIT_MOVIES } from "../../queries/Edit";
import { DELETE_MOVIE } from "../../queries/DeleteMovie";

const CardLayout = () => {
  // State management
  const [layout, setLayout] = useState("grid"); // Current layout mode: "grid" or "table"
  const [searchQuery, setSearchQuery] = useState(""); // Search query for filtering movies
  const [currentPage, setCurrentPage] = useState(1); // Current page of pagination
  const [rowsPerPage, setRowsPerPage] = useState(6); // Number of movies per page
  const [createFormOpen, setCreateFormOpen] = useState(false); // Control for create form dialog
  const [editingCard, setEditingCard] = useState(null); // Currently edited movie
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Control delete confirmation dialog
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery); // Debounced search query
  const [editCardOpen, setEditCardOpen] = useState(false); // Control edit movie dialog
  const theme = useTheme();
  const [newCardData, setNewCardData] = useState({
    image: "",
    title: "",
    directorName: "",
    releaseDate: "",
    description: "",
  }); // Data for creating a new movie
  const itemsPerPage = 9; // Movies per pagination page
  // Mutation hooks
  const [createMovie] = useMutation(CREATE_MOVIE);
  const [editMovie] = useMutation(EDIT_MOVIES);
  const [deleteMovie] = useMutation(DELETE_MOVIE);
  // Lazy query for fetching movies
  const [getAllMovies, { error: getAllMoviesErorr, data: getAllMoviesData }] =
    useLazyQuery(GET_ALL_MOVIES);
  const [cardData, setCardData] = useState(getAllMoviesData);

  // Debounce search query to prevent excessive API calls
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery]);

  // Fetching movies based on debounced search query and other parameters
  useEffect(() => {
    getAllMovies({
      variables: {
        page: currentPage - 1,
        rows: rowsPerPage,
        sort: {
          order: null,
          column: null,
        },
        search: debouncedSearchQuery,
      },
    });
  }, [debouncedSearchQuery, currentPage, getAllMovies, rowsPerPage]);

  // Handling errors and missing data
  if (getAllMoviesErorr) return <p>Error: {getAllMoviesErorr.message}</p>; // Extracting movies from fetched data
  if (!getAllMoviesData) {
    return <p>No data available.</p>;
  }
  const movies = getAllMoviesData.movies.movies;

  // Handling creating a new movie
  const handleCreateMovie = async (newMovieData) => {
    try {
      // Performing mutation to create a new movie
      const { data } = await createMovie({
        variables: {
          image: newMovieData.image,
          name: newMovieData.title,
          description: newMovieData.description,
          directorName: newMovieData.directorName,
          releaseDate: newMovieData.releaseDate,
        },
        refetchQueries: [{ query: GET_ALL_MOVIES }],
      });
      // Updating local state with new movie data
      setNewCardData({
        image: newMovieData.image,
        title: newMovieData.name,
        description: newMovieData.description,
        directorName: newMovieData.directorName,
        releaseDate: newMovieData.releaseDate,
      });
      // Refreshing the page to reflect the new movie
      window.location.reload();
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  // Handle search query input
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset current page when searching
  };

  // Handling pagination page change
  const handlePaginationChange = (event, value) => {
    setCurrentPage(value); // Update the current page when pagination is changed
  };

  // Handling opening the create movie form
  const handleCreateFormOpen = () => {
    setCreateFormOpen(true);
  };
  // Handling closing the create movie form
  const handleCreateFormClose = () => {
    setCreateFormOpen(false);
    // Resetting the form data when closing the form
    setNewCardData({
      image: "",
      title: "",
      description: "",
      directorName: "",
      releaseDate: "",
    });
  };

  // Handling clicking the edit button for a movie
  const handleEditClick = (card) => {
    setEditingCard(card);
    setEditCardOpen(true);
  };

  // Handling updating a movie after editing
  const handleUpdateCard = async (updatedCard) => {
    try {
      // Perform mutation to edit the movie
      const { data } = await editMovie({
        variables: {
          image: updatedCard.image,
          editMovieId: updatedCard.id,
          name: updatedCard.title,
          description: updatedCard.content,
          directorName: updatedCard.directorName,
          releaseDate: updatedCard.releaseDate,
        },
      });
      // Update local state with the edited movie data
      const updatedCardData = cardData.map((card) =>
        card.id === updatedCard.id ? data.editMovie : card
      );
      setCardData(updatedCardData);
      setEditCardOpen(false); // Close the edit dialog
    } catch (error) {
      console.error("Error editing movie:", error);
    }
  };

  // Handling closing the edit movie form
  const handleEditFormClose = () => {
    setEditCardOpen(false);
    setEditingCard(null);
  };

  // Handling clicking the delete button for a movie
  const handleDeleteClick = (card) => {
    setEditingCard(card);
    setDeleteModalOpen(true);
  };

  // Handle confirming movie deletion
  const handleDeleteConfirm = async () => {
    if (editingCard) {
      // Perform mutation to delete the movie
      await deleteMovie({
        variables: {
          deleteMovieId: editingCard.id,
        },
        refetchQueries: [{ query: GET_ALL_MOVIES }],
      });
      window.location.reload(); // Refresh the page after deletion
    }
    setDeleteModalOpen(false); // Closing the delete confirmation dialog
  };

  // Handle changing the number of movies displayed per page
  const handleRowsPerPageChange = (event) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    setCurrentPage(1); // Reseting page number when changing rows per page
    setRowsPerPage(rowsPerPage); // Updating rows per page state
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          position="relative"
          marginBottom="3rem" /* Adding margin to the bottom of the card container */
        >
          <div>
            {/* Search bar */}
            <SearchBar
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              handleCreateFormOpen={handleCreateFormOpen}
              newCardData={newCardData}
              setNewCardData={setNewCardData}
              createFormOpen={createFormOpen}
              handleCreateFormClose={handleCreateFormClose}
              setLayout={setLayout}
            />
            {/* Opening the form, filling and submitting data and closing the form */}
            <NewMovieForm
              open={createFormOpen}
              handleClose={handleCreateFormClose}
              handleCreateMovie={handleCreateMovie}
            />
            {/* Conditions to check if layout is grid or table and if movie data exists*/}
            {layout === "grid" && movies ? (
              <CardsGrid
                searchQuery={searchQuery}
                data={getAllMoviesData.movies.movies}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ) : layout === "table" && movies ? (
              <CardsTable
                searchQuery={searchQuery}
                data={getAllMoviesData.movies.movies}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ) : null}

            <EditUser
              open={editCardOpen} // Passing the state variable to control the modal
              handleClose={handleEditFormClose}
              editingCard={editingCard}
              handleUpdateCard={handleUpdateCard}
            />
            {/* Dialog box to close the delete a card or row in a table. */}
            <Dialog
              open={deleteModalOpen} // Passing the state variable to control the modal
              onClose={() => setDeleteModalOpen(false)}
            >
              <DialogTitle>Delete Confirmation</DialogTitle>

              <DialogContent>
                Are you sure you want to delete this card?
              </DialogContent>

              <DialogActions>
                <Button
                  onClick={() => setDeleteModalOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>

                <Button onClick={handleDeleteConfirm} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Container>

      {/*Displaying rows per page in form control at the footer  */}
      <Box
        display="flex"
        justifyContent="start"
        alignItems="center"
        padding="0.5rem"
        width="100%"
        backgroundColor="slategrey"
        position="fixed"
        bottom="0"
        zIndex="100"
        color="white!important"
        sx={{ flexGrow: 1 ,
          color:
          theme.palette.mode === "light"
            ? theme.palette.common.black
            : theme.palette.common.white,
            bgcolor: theme.palette.mode === "light" ? theme.palette.secondary.main : theme.palette.grey[900],
        border: theme.palette.mode === "dark" && "none",
        height: "8vh",
        }}
      >
        <h5> Rows Per Page</h5>
        <FormControl sx={{ height: "2.5rem",}}>
          <Select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            sx={{
              minWidth: "30%",
             
              marginLeft: "10px",
            }}
          >
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
        {/* Displaying pagination at the bottom of the page */}
        <Pagination
          count={Math.ceil(getAllMoviesData.movies.total_rows / rowsPerPage)}
          page={currentPage}
          onChange={handlePaginationChange}
          style={{color: "white!important"}}
          justifyContent="end"
        />
      </Box>
    </>
  );
};

export default CardLayout;
