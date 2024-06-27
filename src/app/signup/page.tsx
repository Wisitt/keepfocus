import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { FormSignupActive } from "../../../public/icon/form";
import signUp from "@/firebase/auth/signup";

export default function SignUpComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { user } = await signUp(email, password, name);

      // Check if user is truthy (successfully signed up)
      if (user) {
        console.log("Signed up successfully:", user.email);
        router.push("/user");
      } else {
        console.error("User object is null or undefined");
      }
    } catch (error: any) { // Specify 'any' or a more specific type like 'Error'
      console.error("Error signing up:", error.message);
      // Handle specific errors or log them as needed
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleForm} className="form">
      <div className="relative">
        <FormSignupActive />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <label className="block mb-5" htmlFor="name">
            <input
              placeholder="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-8 w-96 h-14 rounded-16 text-lg mt-8 text-black rounded-2xl"
            />
          </label>
          <label className="block mb-5" htmlFor="email">
            <input
              placeholder="example@mail.com"
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-8 w-96 h-14 rounded-16 text-lg text-black rounded-2xl"
            />
          </label>
          <label className="block mb-5 relative" htmlFor="password">
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="pl-8 w-96 h-14 rounded-16 text-lg text-black rounded-2xl"
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </label>
          <label className="block mb-10 relative" htmlFor="confirmPassword">
            <input
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-8 w-96 h-14 rounded-16 text-lg text-black rounded-2xl"
            />

            <span
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </label>
          <button className="bg-neutral-900 w-96 h-14 rounded-16 text-lg text-white rounded-2xl" type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  );
}
