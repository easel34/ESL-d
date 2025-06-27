import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Grid,
  Paper,
  Typography,
  useTheme,
  LinearProgress,
  Tooltip,
  Badge,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  Refresh,
  DownloadOutlined,
  Settings as SettingsIcon,
  Sensors,
  LocalOffer,
  ErrorOutline,
  NotificationsActive,
} from "@mui/icons-material";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import SettingsPage from "../settings";
import { tokens } from "../../theme";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    online: 0,
    offline: 0,
    promotions: 0,
    lastSync: null,
    errors: 0,
    notifications: [],
  });
  const [unreadCount, setUnreadCount] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const settingsRef = useRef(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const data = await mockFetchStats();
      setStats(data);
      setUnreadCount(data.notifications.filter((n) => !n.read).length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const id = setInterval(fetchStats, 30000);
    return () => clearInterval(id);
  }, []);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(stats)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard_stats_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box m={2}>
      {/* 🧭 Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Header
          title="ESL Dashboard"
          subtitle={`Overview • Last sync: ${stats.lastSync || "Never"}`}
        />
        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Refresh">
            <span>
              <IconButton onClick={fetchStats} disabled={loading}>
                <Refresh />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton onClick={() => setSettingsOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            startIcon={<DownloadOutlined />}
            onClick={handleExport}
            sx={{
              bgcolor: colors.blueAccent[700],
              "&:hover": { bgcolor: colors.blueAccent[800] },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* 📊 Stats Cards */}
      <Grid container spacing={2} mb={2}>
        {loading
          ? [0, 1, 2, 3].map((i) => (
              <Grid item xs={12} md={6} lg={3} key={i}>
                <Skeleton variant="rounded" height={120} />
              </Grid>
            ))
          : [
              {
                value: stats.total,
                label: "Total ESLs",
                icon: <Sensors style={{ color: colors.greenAccent[500] }} />,
                color: colors.greenAccent[500],
                progress: stats.online / stats.total,
              },
              {
                value: stats.offline,
                label: "Offline ESLs",
                icon: <ErrorOutline style={{ color: colors.redAccent[500] }} />,
                color: colors.redAccent[500],
                progress: stats.offline / stats.total,
              },
              {
                value: stats.promotions,
                label: "Active Promotions",
                icon: <LocalOffer style={{ color: colors.blueAccent[500] }} />,
                color: colors.blueAccent[500],
                progress: stats.promotions / stats.total,
              },
              {
                value: stats.errors,
                label: "System Errors",
                icon: (
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsActive
                      style={{ color: colors.yellowAccent[500] }}
                    />
                  </Badge>
                ),
                color: colors.yellowAccent[500],
                progress: stats.errors / stats.total,
              },
            ].map((card, idx) => (
              <Grid item xs={12} md={6} lg={3} key={idx}>
                <Fade in timeout={500}>
                  <div>
                    <StatBox
                      title={card.value}
                      subtitle={card.label}
                      icon={card.icon}
                      color={card.color}
                      progress={card.progress || 0}
                    />
                  </div>
                </Fade>
              </Grid>
            ))}
      </Grid>

      {/* 🔔 Notifications & ⚕️ System Health */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper
            sx={{ p: 2, bgcolor: colors.primary[400], minHeight: "260px" }}
          >
            <Typography variant="h6" mb={1}>
              Recent Notifications
            </Typography>
            {loading ? (
              <Skeleton height={200} />
            ) : stats.notifications.length === 0 ? (
              <Typography>No notifications at this time.</Typography>
            ) : (
              stats.notifications.slice(0, 5).map((n) => (
                <Paper
                  key={n.id}
                  sx={{
                    p: 1,
                    mb: 1,
                    bgcolor: n.read ? colors.primary[400] : colors.primary[300],
                    borderLeft: `4px solid ${
                      n.type === "error"
                        ? colors.redAccent[700]
                        : n.type === "warning"
                        ? colors.redAccent[500]
                        : colors.blueAccent[500]
                    }`,
                    cursor: "pointer",
                    "&:hover": { bgcolor: colors.primary[500] },
                  }}
                >
                  <Typography>{n.text}</Typography>
                  <Typography variant="caption">{n.timestamp}</Typography>
                </Paper>
              ))
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2, bgcolor: colors.primary[400] }}>
            <Typography variant="h6">System Health</Typography>
            {loading ? (
              <Skeleton height={150} />
            ) : (
              <>
                <Box mt={2}>
                  <Typography>
                    Errors:
                    <Typography
                      variant="body1"
                      component="span"
                      sx={{
                        ml: 1,
                        fontWeight: "bold",
                        color: stats.errors
                          ? colors.redAccent[500]
                          : colors.greenAccent[500],
                      }}
                    >
                      {stats.errors}
                    </Typography>
                  </Typography>
                </Box>
                <Box mt={2}>
                  <LinearProgress
                    variant="determinate"
                    value={100}
                    color={stats.errors ? "error" : "primary"}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* ⚙️ Settings Drawer */}
      {settingsOpen && (
        <Fade in={settingsOpen} timeout={400}>
          <Box
            ref={settingsRef}
            sx={{
              position: "fixed",
              right: 0,
              top: 0,
              height: "100vh",
              width: { xs: "100%", sm: 380 },
              bgcolor: colors.primary[400],
              boxShadow: 6,
              p: 3,
              overflowY: "auto",
              zIndex: 1400,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Settings</Typography>
              <IconButton onClick={() => setSettingsOpen(false)}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <SettingsPage />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default Dashboard;

// ---- MOCK BACKEND CALL (replace ASAP) ----
async function mockFetchStats() {
  return new Promise((res) => {
    setTimeout(() => {
      res({
        total: 150,
        online: 140,
        offline: 10,
        promotions: 27,
        lastSync: new Date().toLocaleString(),
        errors: 2,
        notifications: [
          {
            id: 1,
            text: "TAG012 offline",
            type: "warning",
            timestamp: "2025-06-25 08:45",
            read: false,
          },
          {
            id: 2,
            text: "New promotion applied to TAG045",
            type: "info",
            timestamp: "2025-06-25 09:30",
            read: false,
          },
        ],
      });
    }, 800);
  });
}
