// src/scenes/promotions/SchedulePromotionModal.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";

const SchedulePromotionModal = ({ open, onClose, onScheduled }) => {
  const [product, setProduct] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSchedule = async () => {
    if (!product || !startDate || !startTime || !endDate || !endTime) {
      alert("Please fill in all fields.");
      return;
    }

    const start = `${startDate}T${startTime}`;
    const end = `${endDate}T${endTime}`;

    if (dayjs(start).isAfter(dayjs(end))) {
      alert("Start date/time must be before end date/time.");
      return;
    }

    const newPromo = {
      id: Date.now(), // Or replace with backend-generated ID
      product,
      start,
      end,
      status: "Upcoming",
    };

    try {
      // ✅ Backend: send POST request here if needed
      // await fetch('/api/promotions', {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newPromo),
      // });

      onScheduled(newPromo);
      handleClose(); // Clear and close
    } catch (err) {
      console.error("Failed to schedule promotion:", err);
      alert("Something went wrong while scheduling.");
    }
  };

  const handleClose = () => {
    setProduct("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Schedule New Promotion</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            autoFocus
            label="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Start Time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="End Time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSchedule}
          variant="contained"
          color="primary"
          disabled={
            !product || !startDate || !startTime || !endDate || !endTime
          }
        >
          Schedule
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchedulePromotionModal;
