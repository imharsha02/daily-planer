"use client";
import SignupForm from "./components/SignupForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignInForm from "./components/SignInForm";

export default function Home() {
  const [isOldUser, setIsOldUser] = useState(false);
  return (
    <div>
      {!isOldUser && (
        <Button
          onClick={() => {
            setIsOldUser(true);
          }}
        >
          Login
        </Button>
      )}

      {isOldUser ? <SignInForm /> : <SignupForm />}
    </div>
  );
}
