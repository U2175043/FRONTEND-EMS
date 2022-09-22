import { useContext } from "react";
import { PositionContext } from "../context/PositionContext";

export const usePositionContext = () => {
  const context = useContext(PositionContext);

  if (!context) {
    throw Error("RoleContext must be used inside an AuthContextProvider");
  }

  return context;
};
