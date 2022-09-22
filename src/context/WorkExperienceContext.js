import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const WorkExperienceContext = createContext();

export const workExperienceReducer = (state, action) => {
  switch (action.type) {
    case "GETEXPERIENCE":
      return { experienceData: action.payload };
    default:
      return state;
  }
};

export const WorkExperienceContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(workExperienceReducer, {
    experienceData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/experience/" + userData._id, {
        signal: abortCont.signal,
        headers: {
          Authorization: userData ? userData.token : "",
        },
      })
        .then((res) => {
          if (!res.ok) {
            // error coming back from server
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          dispatch({ type: "GETEXPERIENCE", payload: data });
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.log(err.message);
          }
        });
      return () => abortCont.abort();
    }
  }, [userData, dispatch]);

  return (
    <WorkExperienceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkExperienceContext.Provider>
  );
};
