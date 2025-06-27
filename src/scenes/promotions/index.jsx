// src/scenes/promotions/Promotions.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import SchedulePromotionModal from "./SchedulePromotionModal";

const Promotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // 🔁 Fetch promotions from backend
  useEffect(() => {
    // TODO: Replace with API call to fetch promotions
    const dummy = [
      {
        id: 1,
        product: "Milk 500ml",
        start: "2025-06-17",
        end: "2025-06-20",
        status: "Running",
      },
      {
        id: 2,
        product: "Bread",
        start: "2025-06-18",
        end: "2025-06-25",
        status: "Upcoming",
      },
    ];
    setPromotions(dummy);
  }, []);

  const filteredPromotions = promotions.filter((p) =>
    p.product.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">📢 Promotions</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          + Schedule Promotion
        </Button>
      </Box>

      <TextField
        label="Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 3 }}
      />

      <Grid container spacing={2}>
        {filteredPromotions.map((promo) => (
          <Grid item xs={12} sm={6} md={4} key={promo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{promo.product}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {promo.start} → {promo.end}
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={promo.status}
                    color={promo.status === "Running" ? "success" : "warning"}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SchedulePromotionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onScheduled={(newPromo) => {
          // TODO: Replace with POST to backend then fetch updated list
          setPromotions((prev) => [...prev, newPromo]);
        }}
      />
    </Box>
  );
};

export default Promotions;
