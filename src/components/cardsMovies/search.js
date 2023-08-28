import React from "react";
import {
  TextField,
  useTheme,
  Stack,
  Box,
  Button,
  ButtonGroup,
} from "@mui/material";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import ViewWeekOutlinedIcon from "@mui/icons-material/ViewWeekOutlined";
import ViewCompactAltOutlinedIcon from "@mui/icons-material/ViewCompactAltOutlined";
import NewUserModal from "../createUser";

const SearchBar = ({
  searchQuery,
  handleSearch,
  handleCreateFormOpen,
  newCardData,
  setNewCardData,
  createFormOpen,
  handleCreateFormClose,
  handleCreateCard,
  layout,
  setLayout,
}) => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      alignItems="center"
      marginBottom={5}
      marginTop={10}
      justifyContent="space-between"
      spacing={{ xs: 2, lg: 0 }}
    >
      {/* Search TextField */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        margin="normal"
        sx={{
          width: "100%", // Full width on all screens
          [theme.breakpoints.down("xs")]: {
            width: "auto", // Width 100% on extra-small screens
          },
          [theme.breakpoints.down("sm")]: {
            marginBottom: theme.spacing(2),
          },
          [theme.breakpoints.up("md")]: {
            marginBottom: theme.spacing(3),
          },
        }}
      />
      <Box display="flex" alignItems="center" gap={0.5} marginTop={2}>
        {/* Create Movie Button */}
        <Button
          variant="outlined"
          startIcon={<PersonAddAlt1OutlinedIcon />}
          onClick={handleCreateFormOpen}
          sx={{
            margin: theme.spacing(2),
            padding: theme.spacing(1, 5),
            gap: 1,
            minWidth: "150px",
            whiteSpace: "nowrap",
            lineHeight: "2.64",
            color:
              theme.palette.mode === "light"
                ? theme.palette.primary.light
                : theme.palette.common.white,
            bgcolor: theme.palette.mode === "dark" && theme.palette.grey[900],
            border: theme.palette.mode === "dark" && "none",
          }}
        >
          Create Movie
        </Button>
        {/* New Movie Form Modal */}
        <NewUserModal
          open={createFormOpen}
          handleClose={handleCreateFormClose}
          formData={newCardData}
          setFormData={setNewCardData}
          handleSubmit={handleCreateCard}
        />
        {/* Button Group for Layout Switch */}
        <ButtonGroup
          sx={{
            [theme.breakpoints.down("xs")]: {
              flexDirection: "column",
              padding: theme.spacing(1),
            },
          }}
        >
       
          {/* Grid Layout Button */}
          <Button
            sx={{
              // ...
              [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(1),
                margin: theme.spacing(1),
              },
            }}
            onClick={() => setLayout("grid")}
            variant={layout === "grid" ? "contained" : "outlined"}
          >
            <ViewCompactAltOutlinedIcon />
          </Button>
             {/* Table Layout Button */}
             <Button
            sx={{
              [theme.breakpoints.down("xs")]: {
                padding: theme.spacing(1),
                margin: theme.spacing(1),
              },
            }}
            onClick={() => setLayout("table")}
            variant={layout === "table" ? "contained" : "outlined"}
          >
            <ViewWeekOutlinedIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Stack>
  );
};

export default SearchBar;
