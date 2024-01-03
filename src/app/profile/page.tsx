"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);
  console.log(data);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.refresh();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Profile page</h1>
      <div>
        <button
          onClick={logout}
          className="border px-4 py-1 rounded  font-semibold hover:bg-gray-800 text-gray-100  duration-30 bg-black"
        >
          Logout
        </button>
      </div>
      <h2 className="p-1 rounded bg-green-500">{data}</h2>
    </div>
  );
}

export default Profile;
