"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      // ✅ Sign in using popup to avoid full page reload
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          flowType: "popup", // popup login
        },
      });

      if (error) {
        console.error("Login Error:", error.message);
        return;
      }

      const user = data.user;
      if (!user) return;

      // ✅ Check if user already exists in 'users' table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Fetch Error:", fetchError.message);
        return;
      }

      // ✅ Insert new user if not exists
      if (!existingUser) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name,
            avatar: user.user_metadata.avatar_url,
          },
        ]);

        if (insertError) {
          console.error("Insert Error:", insertError.message);
          return;
        }

        console.log("New user saved in Supabase!");
      }

      // ✅ Redirect to dashboard after login
      router.push("/home");
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center border rounded-2xl p-8 bg-white shadow-lg">
        <img
          src={"/logo.png"}
          alt="Logo"
          width={150}
          height={100}
          className="w-[180px]"
        />
        <div className="flex items-center flex-col mt-5">
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
          <p className="text-gray-500 text-center mt-2">
            Sign in with Google Authentication
          </p>

          <Button onClick={signInWithGoogle} className="mt-7 w-full">
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
