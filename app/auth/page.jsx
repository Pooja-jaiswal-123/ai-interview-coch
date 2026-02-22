"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    try {
      // ✅ Popup hatao aur Redirect flow use karo
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Iska path wahi hona chahiye jo hum api folder mein banayenge
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        console.error("Login Error:", error.message);
      }
      
      // Note: Redirect flow mein code yahan se aage nahi badhta, 
      // seedha Google login page par chala jata hai.
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center border rounded-2xl p-8 bg-white shadow-lg">
        <img src="/logo.png" alt="Logo" className="w-[180px]" />
        <div className="flex items-center flex-col mt-5">
          <img src="/login.png" alt="Login" className="w-[400px] h-[250px] rounded-2xl" />
          <h2 className="text-2xl font-bold text-center mt-5">Welcome to HireMate AI</h2>
          <p className="text-gray-500 text-center mt-2">Sign in with Google Authentication</p>
          <Button onClick={signInWithGoogle} className="mt-7 w-full">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;