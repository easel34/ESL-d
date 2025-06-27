import { createContext, useContext, useState } from "react";

// Dummy initial data
const initialPromotions = [
  {
    id: "1",
    title: "Milk 500ml Promo",
    start: "2025-06-17",
    end: "2025-06-21",
    backgroundColor: "#4caf50",
  },
  {
    id: "2",
    title: "Bread Discount",
    start: "2025-06-20",
    end: "2025-06-25",
    backgroundColor: "#ff9800",
  },
];

const PromotionsContext = createContext();

export const PromotionsProvider = ({ children }) => {
  const [promotions, setPromotions] = useState(initialPromotions);

  const addPromotion = (promo) => {
    setPromotions((prev) => [...prev, promo]);
  };

  return (
    <PromotionsContext.Provider value={{ promotions, addPromotion }}>
      {children}
    </PromotionsContext.Provider>
  );
};

export const usePromotions = () => useContext(PromotionsContext);
