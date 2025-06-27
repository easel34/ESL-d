import React from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

// Auth & Contexts
import { AuthProvider } from "./context/AuthContext";
import { PromotionsProvider } from "./context/PromotionsContext";
import PrivateRoute from "./components/PrivateRoute";

// Scenes / Pages
import LoginPage from "./scenes/login/LoginPage";
import Dashboard from "./scenes/dashboard";
import Promotions from "./scenes/promotions";
import SettingsPage from "./scenes/settings";
import CalendarView from "./scenes/calendar";
import TagList from "./scenes/tags";
import AuditLogs from "./scenes/auditLogs";
import Team from "./scenes/team/index";

// Layout
import Layout from "./components/Layout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <PromotionsProvider>
            <Routes>
              {/* Public login page */}
              <Route path="/login" element={<LoginPage />} />

              {/* Protected layout with nested routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Layout />
                  </PrivateRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="promotions" element={<Promotions />} />
                <Route path="calendar" element={<CalendarView />} />
                <Route path="tags" element={<TagList />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="audit-logs" element={<AuditLogs />} />
                <Route path="team" element={<Team />} />
              </Route>
            </Routes>
          </PromotionsProvider>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
