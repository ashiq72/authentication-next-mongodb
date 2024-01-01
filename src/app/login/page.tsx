"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const respone = await axios.post("api/users/login", user);
      console.log("Logim suscess", respone.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("login falied", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="shadow-lg py-4 px-8 rounded-lg">
        <h1 className="font-sans font-medium text-2xl my-4 text-center">
          {loading ? "Processing" : "Signup"}
        </h1>

        <div className="flex flex-col items-start">
          <label htmlFor="email">Email:</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label htmlFor="password">Password:</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            {buttonDisabled ? "No Login" : "Login"}
          </button>
          <Link href="/signup" className="text-green-500">
            Visit signup page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
