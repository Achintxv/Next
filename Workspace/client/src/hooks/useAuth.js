import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ loggedIn: true }); // Replace with actual API call
    }
  }, []);

  return { user, isAuthenticated: !!user };
}