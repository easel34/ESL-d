import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "Viewer",
  });

  useEffect(() => {
    // TODO: Replace with real API call
    setTeamMembers([
      {
        id: 1,
        name: "Easel Kihiu",
        email: "easel@esl.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2025-06-16",
      },
      {
        id: 2,
        name: "Grace W.",
        email: "grace@esl.com",
        role: "Technician",
        status: "Active",
        lastLogin: "2025-06-15",
      },
      {
        id: 3,
        name: "John D.",
        email: "john@esl.com",
        role: "Viewer",
        status: "Inactive",
        lastLogin: "2025-06-10",
      },
    ]);
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleAddMember = () => {
    const newId = teamMembers.length + 1;
    setTeamMembers([
      ...teamMembers,
      { id: newId, ...newMember, status: "Pending", lastLogin: "N/A" },
    ]);
    handleCloseDialog();
  };

  const roleColors = {
    Admin: "primary",
    Technician: "success",
    Viewer: "default",
  };

  return (
    <Box m={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">👥 Teams</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Invite Member
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>{member.name[0]}</Avatar>
                </TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Chip label={member.role} color={roleColors[member.role]} />
                </TableCell>
                <TableCell>{member.status}</TableCell>
                <TableCell>{member.lastLogin}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Invite New Member</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newMember.name}
            onChange={(e) =>
              setNewMember({ ...newMember, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
              label="Role"
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Technician">Technician</MenuItem>
              <MenuItem value="Viewer">Viewer</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddMember} variant="contained">
            Send Invite
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
