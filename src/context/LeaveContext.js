import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const LeaveContext = createContext();

export const leaveReducer = (state, action) => {
  switch (action.type) {
    case "GETLEAVES":
      return { leaveData: action.payload };
    default:
      return state;
  }
};

export const LeaveContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(leaveReducer, {
    leaveData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/leave/hr", {
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
          dispatch({ type: "GETLEAVES", payload: data });
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
    <LeaveContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LeaveContext.Provider>
  );
};
