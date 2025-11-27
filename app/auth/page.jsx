"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/services/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <img
          src={"/logo.png"}
          alt="Logo"
          width={150}
          height={100}
          className="w-[180px]"
        />
        <div className="flex items-center flex-col">
          <img
            src={"/login.png"}
            alt="Login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to HireMate AI
          </h2>
          <p className="text-gray-500 text-center">
            Sign in with Google Authentication
          </p>

          {/* ✅ Added onClick event */}
          <Button onClick={signInWithGoogle} className="mt-7 w-full">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
