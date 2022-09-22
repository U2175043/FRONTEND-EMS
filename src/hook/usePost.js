import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const usePost = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { userData } = useAuthContext();
  

  const Post = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userData ? userData.token : "",
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json);
    }
    if (response.ok) {

      // update loading state
      setIsLoading(false);
    }
  } catch (err) {
    setIsLoading(false);
    setError(err);
    console.log("From Hook", err)
  }
  };

  return { Post, isLoading, error };
};
