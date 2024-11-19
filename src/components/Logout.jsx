import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import init from "../firebase";

const Logout = () => {
  const auth = init.auth;
  const navigate = useNavigate();
  useEffect(() => {
    signOut(auth);
    navigate("/");
  }, [auth, navigate]);
};

export default Logout;
