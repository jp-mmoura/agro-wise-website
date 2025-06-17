"use client";

import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export function useAuth() {
  const router = useRouter();

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return {
    signOut,
  };
} 