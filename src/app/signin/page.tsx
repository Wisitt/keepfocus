import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import signInWithEmailAndPassword from "@/firebase/auth/signin";
import { FormLoginActive } from "../../../public/icon/form";

export default function SignInComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(email, password);
      console.log("Signed in successfully");
      router.push("/user");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/user', redirect: true });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSpotifySignIn = async () => {
    try {
      await signIn('spotify', { callbackUrl: '/user' });
    } catch (error) {
      console.error('Error signing in with Spotify:', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="relative">
        <FormLoginActive />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-black font-semibold text-xl">Welcome back</h1>
          <label className="block mb-5">
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="pl-8 w-96 h-14 rounded-16 text-lg mt-8 text-black rounded-2xl"
            />
          </label>
          <label className="block mb-5 relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              id="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pl-8 w-96 h-14 rounded-16 text-lg text-black rounded-2xl"
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </label>
          <div className="flex items-center justify-between w-96 mb-8">
            <label className="text-black font-medium">
              <input type="checkbox" className="mr-2 form-checkbox h-5 w-5 text-blue-600 accent-white" />
              Remember Me
            </label>
            <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
          </div>
          <button className="bg-neutral-900 w-96 h-14 rounded-16 text-lg text-white rounded-2xl" type="submit">Log In</button>
          <button onClick={handleGoogleSignIn} className="bg-[#DD2A7B] mt-3 w-96 h-14 rounded-16 text-lg text-white rounded-2xl">Sign in with Google</button>
          <button
            onClick={handleSpotifySignIn}
            className="bg-[#1DB954] mt-3 w-96 h-14 rounded-16 text-lg text-white rounded-2xl"
          >
            Sign in with Spotify
          </button> 
        </div>
      </div>
    </form>
  );
}
