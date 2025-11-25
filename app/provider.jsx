"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/public/services/supabaseClient";
import React, { useContext, useEffect, useState } from "react";

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    const {
      data: { user: loggedUser },
      error,
    } = await supabase.auth.getUser();

    if (!loggedUser) {
      console.log("No user logged in");
      return;
    }

    console.log("Logged in user →", loggedUser.email);

    let { data: Users } = await supabase
      .from("Users")
      .select("*")
      .eq("email", loggedUser.email);

    console.log("Users fetched:", Users);

    // Set state
    setUser(Users?.[0] || null);

    // Insert only if not exists
    if (!Users || Users.length === 0) {
      const { data } = await supabase.from("Users").insert([
        {
          name: loggedUser.user_metadata?.name || "",
          email: loggedUser.email,
          picture: loggedUser.user_metadata?.avatar_url || "",
          credits: 10,
        },
      ]);

      console.log("User created:", data);
    } else {
      console.log("User already exists.");
    }
  };

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;

// Hook
export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
