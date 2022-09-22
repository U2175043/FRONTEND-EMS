import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const EmployeeContext = createContext();

export const employeeReducer = (state, action) => {
  switch (action.type) {
    case "GETSINGLEEMP":
      return { employeeData: action.payload };
    default:
      return state;
  }
};

export const EmployeeContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(employeeReducer, {
    employeeData: null,
  });

  useEffect(() => {
    const useHr = JSON.parse(localStorage.getItem("userData"));

    if (useHr && useHr.emp.Account === 3) {
      const abortCont = new AbortController();
      fetch("http://localhost:4000/api/employee/" + useHr.emp._id, {
        signal: abortCont.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: userData ? useHr.token : "",
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
          dispatch({ type: "GETSINGLEEMP", payload: data });
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.log(err);
          }
        });

      return () => abortCont.abort();
    }
  }, [userData, dispatch]);

  return (
    <EmployeeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </EmployeeContext.Provider>
  );
};
