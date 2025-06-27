import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  Typography,
  Divider,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { ColorModeContext } from "../theme";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = ({ setIsSidebar }) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileClick = (e) => setProfileAnchorEl(e.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleNotifClick = (e) => setNotifAnchorEl(e.currentTarget);
  const handleNotifClose = () => setNotifAnchorEl(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSettings = () => {
    navigate("/settings");
    handleProfileClose();
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const notifications = [
    { icon: <InfoIcon fontSize="small" />, text: "System update scheduled." },
    {
      icon: <WarningIcon fontSize="small" color="warning" />,
      text: "Low battery on tag #23.",
    },
    {
      icon: <CheckCircleIcon fontSize="small" color="success" />,
      text: "Promotion pushed successfully.",
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        py: 1.5,
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Sidebar Toggle */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setIsSidebar((prev) => !prev)}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" ml={2} fontWeight="bold">
          ESL Manager
        </Typography>
      </Box>

      {/* Right Actions */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* System Health */}
        <Tooltip title="System Health: OK">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: "green",
            }}
          />
        </Tooltip>

        {/* Time */}
        <Typography variant="body2">{currentTime}</Typography>

        {/* Refresh */}
        <Tooltip title="Refresh">
          <IconButton onClick={() => window.location.reload()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton onClick={handleNotifClick}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={notifAnchorEl}
          open={Boolean(notifAnchorEl)}
          onClose={handleNotifClose}
          PaperProps={{ style: { width: 300 } }}
        >
          <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
            Notifications
          </Typography>
          <Divider />
          {notifications.map((notif, index) => (
            <MenuItem key={index} onClick={handleNotifClose}>
              <ListItemIcon>{notif.icon}</ListItemIcon>
              <ListItemText primary={notif.text} />
            </MenuItem>
          ))}
        </Menu>

        {/* Theme Toggle */}
        <Tooltip title="Toggle Theme">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip title="Profile">
          <IconButton onClick={handleProfileClick}>
            <Avatar
              alt={user?.name || "Admin"}
              src={profileImage || "/static/avatar.jpg"}
            />
          </IconButton>
        </Tooltip>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={user?.name || "Admin"}
              secondary={user?.role || "Super Admin"}
            />
          </MenuItem>

          <MenuItem>
            <label
              htmlFor="upload-profile-image"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <ListItemIcon>
                <PhotoCameraIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Upload Photo" />
            </label>
            <input
              id="upload-profile-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfileImageChange}
            />
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Paper>
  );
};

export default Topbar;
