import { useContext } from "react";
import { RoleContext } from "../context/RoleContext";

export const useRoleContext = () => {
  const context = useContext(RoleContext);

  if (!context) {
    throw Error("RoleContext must be used inside an AuthContextProvider");
  }

  return context;
};
