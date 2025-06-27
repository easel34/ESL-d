// src/components/Header.jsx

import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>📊 ESL Admin Dashboard</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#1f2937",
    padding: "1rem",
    color: "#fff",
    textAlign: "center",
    borderBottom: "4px solid #3b82f6",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
};

export default Header;
