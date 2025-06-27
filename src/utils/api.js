// Add this near the top or import from utils/api.js
const fetchESLStats = async () => {
  // Replace with actual API call logic
  return {
    total: 100,
    online: 90,
    offline: 10,
    promotions: 5,
    lastSync: new Date().toLocaleString(),
    errors: 2,
    topPromoted: [{ id: "ESL123", count: 15 }],
    timeline: [],
    statusDistribution: { online: 90, offline: 10, errors: 2 },
    notifications: [
      {
        id: 1,
        text: "New promotion applied.",
        timestamp: "2025-06-16 18:32",
        type: "info",
        read: false,
      },
    ],
  };
};
