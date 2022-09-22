import { useContext } from "react";
import { CompanyContext } from "../context/CompanyContext";

export const useCompanyContext = () => {
  const context = useContext(CompanyContext);

  if (!context) {
    throw Error("RoleContext must be used inside an AuthContextProvider");
  }

  return context;
};
