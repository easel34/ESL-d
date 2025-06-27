import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Switch,
  TextField,
  FormControlLabel,
  Button,
  Divider,
  MenuItem,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { useAuth } from "../../context/AuthContext";

const SettingsPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || "Easel",
    email: "admin@example.com",
    role: user?.role || "Admin",
  });

  const [system, setSystem] = useState({
    autoSync: true,
    updateInterval: 15,
    currency: "KES",
    language: "en",
  });

  const handleSave = () => {
    console.log("Saving settings:", { profile, system });
    // TODO: Save to backend
  };

  return (
    <Box m="20px">
      <Typography variant="h4" gutterBottom>
        ⚙️ Settings
      </Typography>
      <Typography color="textSecondary" mb={3}>
        Manage your account, preferences, and system behavior
      </Typography>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: colors.primary[400] }}>
        <Typography variant="h6" gutterBottom>
          👤 Profile Settings
        </Typography>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        />
        <TextField
          fullWidth
          label="Role"
          margin="normal"
          disabled
          value={profile.role}
        />
      </Paper>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: colors.primary[400] }}>
        <Typography variant="h6" gutterBottom>
          🌐 Language & Currency
        </Typography>
        <TextField
          select
          fullWidth
          label="Language"
          margin="normal"
          value={system.language}
          onChange={(e) => setSystem({ ...system, language: e.target.value })}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="sw">Swahili</MenuItem>
        </TextField>

        <TextField
          select
          fullWidth
          label="Currency"
          margin="normal"
          value={system.currency}
          onChange={(e) => setSystem({ ...system, currency: e.target.value })}
        >
          <MenuItem value="KES">KES (Kenyan Shilling)</MenuItem>
          <MenuItem value="USD">USD (US Dollar)</MenuItem>
        </TextField>
      </Paper>

      <Paper sx={{ p: 3, mb: 4, backgroundColor: colors.primary[400] }}>
        <Typography variant="h6" gutterBottom>
          ⚙️ System Preferences
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={system.autoSync}
              onChange={(e) =>
                setSystem({ ...system, autoSync: e.target.checked })
              }
            />
          }
          label="Auto-Sync ESL Tags"
        />
        <TextField
          fullWidth
          type="number"
          label="Update Frequency (mins)"
          margin="normal"
          value={system.updateInterval}
          onChange={(e) =>
            setSystem({ ...system, updateInterval: parseInt(e.target.value) })
          }
        />
      </Paper>

      <Paper sx={{ p: 3, backgroundColor: colors.primary[400] }}>
        <Typography variant="h6" gutterBottom>
          🔐 Account Security
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          onClick={() => alert("Coming soon: Change password")}
        >
          Change Password
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 2 }}
          onClick={() => alert("Feature under review")}
        >
          Delete Account
        </Button>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="success" onClick={handleSave}>
          Save All Changes
        </Button>
      </Box>
    </Box>
  );
};

export default SettingsPage;
