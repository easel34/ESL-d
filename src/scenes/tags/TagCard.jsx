import React, { useState } from "react";
import { Box, Grid, TextField, MenuItem, Typography } from "@mui/material";
import TagCard from "../components/TagCard";

const mockTags = [
  {
    id: "TAG001",
    product: "Milk 500ml",
    battery: 80,
    signal: -70,
    status: "Synced",
    lastUpdated: "2025-06-17",
    category: "Dairy",
  },
  {
    id: "TAG002",
    product: "Bread",
    battery: 60,
    signal: -75,
    status: "Pending",
    lastUpdated: "2025-06-16",
    category: "Bakery",
  },
  {
    id: "TAG003",
    product: "Yogurt",
    battery: 90,
    signal: -68,
    status: "Synced",
    lastUpdated: "2025-06-17",
    category: "Dairy",
  },
  // more...
];

const categories = ["All", "Dairy", "Bakery", "Beverages", "Snacks"];

const TagMonitor = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const handleSync = (id) => {
    console.log(`Force syncing tag with ID: ${id}`);
    // Implement your sync logic here
  };

  const filteredTags = mockTags.filter((tag) => {
    const matchSearch =
      tag.product.toLowerCase().includes(search.toLowerCase()) ||
      tag.id.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || tag.category === category;

    return matchSearch && matchCategory;
  });

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        Tag Monitor
      </Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search by Product or Tag ID"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ minWidth: "300px" }}
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ minWidth: "200px" }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Grid container spacing={2}>
        {filteredTags.map((tag) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tag.id}>
            <TagCard tag={tag} onSync={handleSync} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TagMonitor;
