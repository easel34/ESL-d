import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Simulated login logic
    if (email === "admin@example.com" && password === "Mamapima12") {
      login("demo-token"); // Save token
      navigate("/"); // Go to dashboard
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor={colors.primary[500]}
      flexDirection="column"
    >
      <Fade in timeout={800}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 2,
            width: 360,
            maxWidth: "90%",
            bgcolor: colors.primary[400],
          }}
        >
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              ESL Admin Login
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter your credentials below
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              required
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPwd(!showPwd)} edge="end">
                      {showPwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 2,
                backgroundColor: colors.blueAccent[700],
                "&:hover": { backgroundColor: colors.blueAccent[800] },
              }}
            >
              Sign In
            </Button>
          </form>

          <Typography align="center" sx={{ my: 2 }}>
            or continue with
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={1}>
            <IconButton
              sx={{
                border: `1px solid ${colors.grey[300]}`,
                "&:hover": { bgcolor: colors.primary[300] },
              }}
            >
              <Google />
            </IconButton>
            <IconButton
              sx={{
                border: `1px solid ${colors.grey[300]}`,
                "&:hover": { bgcolor: colors.primary[300] },
              }}
            >
              <Facebook />
            </IconButton>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box textAlign="center">
            <Typography variant="caption" color="textSecondary">
              Don’t have an account?{" "}
              <Button variant="text" size="small">
                Register
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Fade>
    </Box>
  );
};

export default LoginPage;
