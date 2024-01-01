"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-serif text-4xl">Profile Page</h1>
      <hr />
      <button
        onClick={logout}
        className="border border-gray-300 py-1 px-4 mt-4 hover:bg-slate-100 duration-300 rounded"
      >
        logout
      </button>
    </div>
  );
}

export default ProfilePage;
