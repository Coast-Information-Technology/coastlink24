// src/hooks/useHandleLogout.ts
"use client";

import { useState } from "react";
import { deleteTokenFromCookies } from "@/lib/cookies"; // Make sure the path is correct
import { useRouter } from "next/navigation";

// Custom hook for handling logout with confirmation modal
export const useHandleLogout = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // Function to confirm the logout
  const confirmLogout = () => {
    try {
      const isTokenDeleted = deleteTokenFromCookies();
      if (isTokenDeleted) {
        router.push("/login");
      } else {
        console.error("Token deletion failed");
      }
    } catch (err) {
      console.error(`Logout failed: ${err}`);
    } finally {
      setIsModalVisible(false);
    }
  };

  // Function to show the modal
  const handleLogout = () => setIsModalVisible(true);

  // Function to cancel the logout process
  const cancelLogout = () => setIsModalVisible(false);

  return {
    isModalVisible,
    confirmLogout,
    handleLogout,
    cancelLogout,
  };
};
