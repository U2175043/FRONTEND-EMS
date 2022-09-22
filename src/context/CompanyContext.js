import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const CompanyContext = createContext();

export const companyReducer = (state, action) => {
  switch (action.type) {
    case "GETCOMPANY":
      return { compData: action.payload };
    default:
      return state;
  }
};

export const CompanyContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(companyReducer, {
    compData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/company/", {
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
          dispatch({ type: "GETCOMPANY", payload: data });
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
    <CompanyContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CompanyContext.Provider>
  );
};
