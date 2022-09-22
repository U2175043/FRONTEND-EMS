import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const RoleContext = createContext();

export const roleReducer = (state, action) => {
  switch (action.type) {
    case "GETROLES":
      return { roleData: action.payload };
    default:
      return state;
  }
};

export const RoleContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(roleReducer, {
    roleData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/role/", {
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
          dispatch({ type: "GETROLES", payload: data });
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
    <RoleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoleContext.Provider>
  );
};
