import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Tag as TagIcon,
  CalendarToday as CalendarIcon,
  LocalOffer as PromotionIcon,
  Settings as SettingsIcon,
  People as TeamIcon,
  ListAlt as AuditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { tokens } from "../theme";

const navItems = [
  { title: "Dashboard", path: "/", icon: <HomeIcon /> },
  { title: "Tag Monitor", path: "/tags", icon: <TagIcon /> },
  { title: "Promotions", path: "/promotions", icon: <PromotionIcon /> },
  { title: "Calendar", path: "/calendar", icon: <CalendarIcon /> },
  { title: "Audit Logs", path: "/audit-logs", icon: <AuditIcon /> },
  { title: "Team", path: "/team", icon: <TeamIcon /> },
  { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

const Sidebar = ({ isSidebar, setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const drawerWidth = isSidebar ? 240 : 70;

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          transition: "width 0.3s ease-in-out",
          bgcolor: colors.primary[500],
          color: colors.grey[100],
          overflowX: "hidden",
          position: "fixed",
          height: "100vh",
          borderRight: "none",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        {isSidebar && (
          <Typography variant="h6" fontWeight="bold">
            ESL Manager
          </Typography>
        )}
        <IconButton onClick={() => setIsSidebar(!isSidebar)}>
          {isSidebar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>

      <List>
        {navItems.map(({ title, path, icon }) => (
          <Tooltip
            key={title}
            title={!isSidebar ? title : ""}
            placement="right"
          >
            <ListItem
              component={NavLink}
              to={path}
              sx={{
                mb: 0.5,
                "&.active": {
                  bgcolor: colors.blueAccent[600],
                  borderRadius: "4px",
                },
                "&:hover": {
                  bgcolor: colors.primary[400],
                  borderRadius: "4px",
                },
              }}
            >
              <ListItemIcon sx={{ color: colors.grey[100], minWidth: 40 }}>
                {icon}
              </ListItemIcon>
              {isSidebar && <ListItemText primary={title} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
