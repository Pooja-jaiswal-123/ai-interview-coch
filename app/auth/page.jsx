"use client";

import React, { useState, useEffect } from "react"; // useEffect add kiya
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Chrome, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Feedback ke liye optional

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // 1. Sync Logic ko alag function mein dala taaki har login pe chale
  const syncUserToDatabase = async (user) => {
    if (!user) return;

    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!existingUser) {
        await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name,
            avatar: user.user_metadata.avatar_url,
          },
        ]);
      }
    } catch (err) {
      console.error("Sync Error:", err);
    }
  };

  // 2. Auth state change listen karein (Popup close hone ke baad ye trigger hoga)
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setLoading(true);
        await syncUserToDatabase(session.user);
        setLoading(false);
        router.push("/dashboard/analytics"); // Sidebar ke active state ke hisaab se redirect
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // 'popup' ki jagah default flow zyada stable hota hai Next.js mein
          redirectTo: `${window.location.origin}/dashboard/analytics`,
        },
      });

      if (error) throw error;
      // Note: Redirect flow mein yahan ke baad code nahi chalega, useEffect handle karega
    } catch (err) {
      console.error("Login Error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Section */}
          <div className="p-8 pb-0 flex flex-col items-center">
            <div className="bg-blue-600 p-3 rounded-2xl mb-6 shadow-lg shadow-blue-200">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-auto brightness-0 invert"
              />
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner bg-gray-100 mb-8">
              <img
                src="/login.png"
                alt="Login Illustration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="px-8 pb-10 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome to <span className="text-blue-600">AI Coach</span>
            </h1>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Sign in to supercharge your job search and interview prep.
            </p>

            <Button
              onClick={signInWithGoogle}
              disabled={loading}
              className="mt-8 w-full h-12 text-md font-semibold bg-gray-900 hover:bg-black text-white flex gap-3"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Chrome className="w-5 h-5" />
              )}
              {loading ? "Authenticating..." : "Continue with Google"}
            </Button>

            <p className="mt-6 text-xs text-gray-400 text-center">
              By signing in, you agree to our{" "}
              <span className="underline cursor-pointer">Terms</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
