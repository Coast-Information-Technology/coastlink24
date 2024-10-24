// @/utils/tokenExpiry.ts

import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time in seconds since the epoch
}

export const getTokenExpiryInDays = (token: string): number | null => {
  try {
    const decoded: JwtPayload = jwtDecode(token); // Decode the token
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    // Calculate the time difference between the current time and expiration
    const timeDifference = decoded.exp - currentTime;

    if (timeDifference <= 0) {
      return 0; // Token has already expired
    }

    // Convert the time difference from seconds to days
    const daysUntilExpiry = timeDifference / (60 * 60 * 24); // Convert seconds to days
    return daysUntilExpiry;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if the token is invalid or can't be decoded
  }
};
