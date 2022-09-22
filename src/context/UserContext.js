import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const UserContext = createContext();

export const userReducer = (state, action) => {
  switch (action.type) {
    case "GETALLUSERS":
      return { usersData: action.payload };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(userReducer, {
    usersData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/employee/", {
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
          dispatch({ type: "GETALLUSERS", payload: data });
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Fetch aborted");
          } else {
            console.log(err.message);
          }
        });
    }
  }, [userData, dispatch]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
