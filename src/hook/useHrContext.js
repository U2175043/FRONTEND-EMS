import { useContext } from "react";
import { HrContext } from "../context/HrContext";

export const useHrContext = () => {
  const context = useContext(HrContext);

  if (!context) {
    throw Error("HrContext must be used inside an AuthContextProvider");
  }

  return context;
};
