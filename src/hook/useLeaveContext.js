import { useContext } from "react";
import { LeaveContext } from "../context/LeaveContext";

export const useLeaveContext = () => {
  const context = useContext(LeaveContext);

  if (!context) {
    throw Error("LeaveContext must be used inside an LeaveContextProvider");
  }

  return context;
};
