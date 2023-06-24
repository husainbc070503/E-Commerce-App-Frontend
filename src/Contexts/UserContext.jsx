import React, { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { URL } from "../Utils/API";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const register = async ({ name, email, password, address, phone, image }) => {
    try {
      const res = await fetch(`${URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          address,
          avatar: image,
          phone,
        }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await fetch(`${URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    const loggedinuser = JSON.parse(localStorage.getItem("e-comm-user"));
    loggedinuser ? setUser(loggedinuser) : setUser();
  }, [navigate]);

  return (
    <Context.Provider value={{ user, register, login }}>
      {children}
    </Context.Provider>
  );
};

const useGlobalUserContext = () => useContext(Context);

export { UserContext, useGlobalUserContext };
