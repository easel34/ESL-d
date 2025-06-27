// src/components/StatsBox.jsx

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const StatsBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
      backgroundColor={theme.palette.background.paper}
      borderRadius="12px"
      boxShadow={3}
      width="100%"
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
        {icon}
      </Box>

      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>

      <Typography variant="body2" color="textSecondary">
        {subtitle}
      </Typography>

      {increase && (
        <Typography
          variant="caption"
          color={increase.startsWith("+") ? "green" : "red"}
          mt={1}
        >
          {increase}
        </Typography>
      )}
    </Box>
  );
};

export default StatsBox;
