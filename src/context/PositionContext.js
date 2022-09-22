import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { useAuthContext } from "../hook/useAuthContext";

export const PositionContext = createContext();

export const positionReducer = (state, action) => {
  switch (action.type) {
    case "GETPOSITION":
      return { posData: action.payload };
    default:
      return state;
  }
};

export const PositionContextProvider = ({ children }) => {
  const { userData } = useAuthContext();
  const [state, dispatch] = useReducer(positionReducer, {
    posData: null,
  });

  useEffect(() => {
    const abortCont = new AbortController();
    if (userData) {
      fetch("http://localhost:4000/api/position/", {
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
          dispatch({ type: "GETPOSITION", payload: data });
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
    <PositionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PositionContext.Provider>
  );
};
