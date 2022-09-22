import { useContext } from "react";
import { WorkExperienceContext } from "../context/WorkExperienceContext";

export const useWorkExperienceContext = () => {
  const context = useContext(WorkExperienceContext);

  if (!context) {
    throw Error("UserContext must be used inside an AuthContextProvider");
  }

  return context;
};
