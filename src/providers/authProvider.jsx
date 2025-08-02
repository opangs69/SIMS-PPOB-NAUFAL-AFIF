import { useLayoutEffect, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import getSessionItem from "../components/getSessionItem";

const AuthProvider = ({ children }) => {
  // const token = localStorage.getItem("tkn");
   const token = getSessionItem("tkn")
  const dispatch = useDispatch()
  
  const { mutate: mutationKeepAuth } = useMutation({
    mutationFn: async () => {
      return await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: (response) => {
      dispatch(setUser(response.data.data))
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useLayoutEffect(() => {
    if (token) {
      mutationKeepAuth();
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
