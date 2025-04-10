import { toast } from "react-toastify";

// Define types for better type safety
interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_deactivated: boolean;
}

interface ApiResponse {
  detail?: string;
  [key: string]: any;
}

/**
 * Sends an activation link to a user's email
 * @param email - The email address to send the activation link to
 * @returns Promise that resolves to true on success
 */
export const sendActivationLink = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/users/activation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to send activation link");
    }

    // Show success toast
    toast.success("Activation link sent successfully");

    return true; // Indicate success
  } catch (error) {
    console.error("Error sending activation link:", error);
    // Show error toast with more specific message
    toast.error(error instanceof Error ? error.message : "Failed to send activation link");
    throw error;
  }
};

/**
 * Resends an activation link to a user
 * @param email - The user's email
 * @param userId - The user's ID
 * @param token - Authentication token
 * @param users - Array of users
 * @param setUsers - Function to update users state
 */
export const handleResendActivationLink = async (
  email: string,
  userId: string,
  token: string,
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): Promise<void> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/users/resend_activation/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to request activation link");
    }

    // Show success toast
    toast.success("Activation email has been sent");

    // Simulate verification process
    setTimeout(() => {
      const updatedUsers = users.map((user) =>
        user.id === userId
          ? { ...user, is_active: true, is_deactivated: false }
          : user
      );
      setUsers(updatedUsers);
    }, 5000); // Simulate verification delay
  } catch (error) {
    console.error("Error requesting activation link:", error);
    // Show error toast with more specific message
    toast.error(error instanceof Error ? error.message : "Failed to request activation link");
  }
};

/**
 * Toggles a user's deactivation status
 * @param user - The user to deactivate/activate
 * @param token - Authentication token
 * @param setUsers - Function to update users state
 */
export const handleDeactivateUser = async (
  user: User,
  token: string,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
): Promise<void> => {
  // Store original state in case we need to revert
  const originalState = {
    is_deactivated: user.is_deactivated,
    is_active: user.is_active
  };
  
  // Update state optimistically
  user.is_deactivated = !user.is_deactivated;
  user.is_active = user.is_deactivated ? false : user.is_active;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/users/${user.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deactivated: user.is_deactivated }),
      }
    );

    const data: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Failed to update user's status");
    }

    // Show success toast
    toast.success(
      `User ${user.is_deactivated ? "deactivated" : "activated"} successfully`
    );

    // Update users state
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id
          ? { ...user, is_active: user.is_deactivated ? false : u.is_active }
          : u
      )
    );
  } catch (error) {
    console.error("Error updating user's status:", error);
    // Show error toast with more specific message
    toast.error(error instanceof Error ? error.message : "Failed to update user's status");
    
    // Revert to original state on error
    user.is_deactivated = originalState.is_deactivated;
    user.is_active = originalState.is_active;
  }
};