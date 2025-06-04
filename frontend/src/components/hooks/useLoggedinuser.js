import { useEffect, useState } from "react";
import { useUserAuth } from "../context/AuthContext";

const useLoggedinuser = () => {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinuser, setLoggedinuser] = useState(null);

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://ev-charger-station.onrender.com/loggedinuser?email=${email}`);
        const data = await response.json();
        // Assuming data is an array, take the first user
        setLoggedinuser(data[0] || {});
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
        setLoggedinuser({});
      }
    };

    fetchUser();
  }, [email]);

  return [loggedinuser, setLoggedinuser];
};

export default useLoggedinuser;
