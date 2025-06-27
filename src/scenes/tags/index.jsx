import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  CircularProgress,
  Tooltip,
  Chip,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SyncIcon from "@mui/icons-material/Sync";

const mockTags = [
  {
    id: "TAG001",
    product: "Apple iPhone 14",
    battery: 78,
    signal: -62,
    lastUpdated: "2025-06-17 11:22",
    status: "Synced",
  },
  {
    id: "TAG002",
    product: "Samsung TV 55in",
    battery: 52,
    signal: -70,
    lastUpdated: "2025-06-17 11:12",
    status: "Pending",
  },
  {
    id: "TAG003",
    product: "Sony Headphones",
    battery: 90,
    signal: -60,
    lastUpdated: "2025-06-17 10:50",
    status: "Synced",
  },
];

const TagList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setTags(mockTags);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setTags(mockTags);
      setLoading(false);
    }, 1000);
  };

  return (
    <Box m={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">📡 Tag Monitor</Typography>
        <Button
          startIcon={<RefreshIcon />}
          variant="outlined"
          onClick={handleRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          {tags.map((tag) => (
            <Grid item xs={12} sm={6} md={4} key={tag.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{tag.product}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    ID: {tag.id}
                  </Typography>

                  <Box mt={1} display="flex" gap={1} alignItems="center">
                    <BatteryChargingFullIcon fontSize="small" />
                    <Typography>{tag.battery}%</Typography>
                  </Box>

                  <Box display="flex" gap={1} alignItems="center">
                    <SignalCellularAltIcon fontSize="small" />
                    <Typography>{tag.signal} dBm</Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated: {tag.lastUpdated}
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Chip
                      label={tag.status}
                      color={tag.status === "Synced" ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Tooltip title="Force Sync Tag">
                    <Button size="small" startIcon={<SyncIcon />}>
                      Sync
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TagList;
