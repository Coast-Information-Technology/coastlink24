import { parse, serialize } from "cookie";

// Function to save a token to cookies
/**
 * Saves the provided token to the browser's cookies.
 * This function should only be executed on the client side.
 * @param {string} token - The token to be saved in the cookies.
 * @returns {boolean} - Returns true if the token was successfully saved, false otherwise.
 */
export const saveTokenToCookies = (token: string): boolean => {
  try {
    if (typeof document === "undefined") return false; // Ensure this only runs on the client side

    // Serialize the token and set the cookie
    const serializedToken = serialize("token", encodeURIComponent(token), {
      httpOnly: false, // Accessible from JavaScript
      secure: process.env.NODE_ENV !== "development", // Secure in production
      sameSite: "strict", // Enforce strict same-site policy
      maxAge: 60 * 60 * 24 * 7, // 1 week duration
      path: "/", // Set cookie available site-wide
    });

    // Set the cookie on the document
    document.cookie = serializedToken;
    return true;
  } catch (error) {
    console.error("Failed to save token to cookies:", error);
    return false;
  }
};

// Function to get a token from cookies
/**
 * Retrieves the token from the cookies on the client side.
 * @returns {string|null} The token value if found in cookies, otherwise null.
 */
export const getTokenFromCookies = (): string | null => {
  if (typeof document === "undefined") return null; // Only run on the client side

  const cookies = parse(document.cookie || ""); // Parse cookies
  return cookies.token ? decodeURIComponent(cookies.token) : null; // Decode token safely
};

// Function to delete a token from cookies
/**
 * Deletes the token cookie from the client-side document.
 * @returns {boolean} Returns true if the token cookie was successfully deleted, false otherwise.
 */

export const deleteTokenFromCookies = (): boolean => {
  if (typeof document === "undefined") return false; // Only run on the client side

  // Set maxAge to -1 to remove the token cookie
  const serializedToken = serialize("token", "", {
    httpOnly: false, // Accessible from JavaScript
    secure: process.env.NODE_ENV !== "development", // Secure in production
    sameSite: "strict", // Same site strict policy
    maxAge: -1, // Set maxAge to negative to delete the cookie
    path: "/", // Ensure deletion applies to the whole site
  });

  document.cookie = serializedToken;
  return true;
};
