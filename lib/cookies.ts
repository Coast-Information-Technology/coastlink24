import { parse, serialize } from "cookie"

/**
 * Cookie key for storing the token.
 */
const TOKEN_KEY = "token"

/**
 * Saves the provided token to the browser's cookies.
 * This function should only be executed on the client side.
 * @param token - The token to be saved in the cookies.
 * @returns True if the token was successfully saved, false otherwise.
 */
export const saveTokenToCookies = (token: string): boolean => {
  try {
    if (typeof document === "undefined") return false // Client-side check

    const cookie = serialize(TOKEN_KEY, encodeURIComponent(token), {
      httpOnly: false, // JavaScript-accessible
      secure: process.env.NODE_ENV !== "development", // Use secure flag in production
      sameSite: "strict", // Protect against CSRF
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/", // Accessible throughout the site
    })

    document.cookie = cookie
    return true
  } catch (error) {
    console.error("Failed to save token to cookies:", error)
    return false
  }
}

/**
 * Retrieves the token from browser cookies.
 * This function should only be executed on the client side.
 * @returns The token string if found, otherwise null.
 */
export const getTokenFromCookies = (): string | null => {
  if (typeof document === "undefined") return null

  const cookies = parse(document.cookie || "")
  const token = cookies[TOKEN_KEY]
  return token ? decodeURIComponent(token) : null
}

/**
 * Deletes the token from browser cookies.
 * This function should only be executed on the client side.
 * @returns True if the token was removed successfully, false otherwise.
 */
export const deleteTokenFromCookies = (): boolean => {
  try {
    if (typeof document === "undefined") return false

    const expiredCookie = serialize(TOKEN_KEY, "", {
      maxAge: -1, // Expire immediately
      path: "/",
    })

    document.cookie = expiredCookie
    return true
  } catch (error) {
    console.error("Failed to delete token from cookies:", error)
    return false
  }
}
