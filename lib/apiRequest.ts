import { toast } from "react-toastify";
import { getTokenFromCookies } from "./cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Makes a POST request to the specified API endpoint with the provided body and optional headers.
 * @param endpoint - The API endpoint to send the request to.
 * @param body - The data to be sent in the request body.
 * @param headers - Additional headers to include in the request (default is an empty object).
 * @returns A Promise that resolves to the response data from the API.
 */
// export const postApiRequest = async (
//   endpoint: string,
//   body: any,
//   headers: object = {}
// ): Promise<any> => {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         ...headers,
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Error response text:", errorText);

//       try {
//         // Try to parse the error response as JSON
//         const errorData = JSON.parse(errorText);
//         // Throw the error message or a default message if it's not present
//         throw new Error(
//           errorData.message || errorData.detail || "Failed to fetch data"
//         );
//       } catch {
//         // If parsing fails, throw the plain text or a generic message
//         throw new Error(errorText || "Failed to fetch data");
//       }
//     }

//     const responseText = await response.text();
//     // Check if the response is not empty, then parse it
//     const data = responseText ? JSON.parse(responseText) : {};
//     return data;
//   } catch (error: any) {
//     console.error("API Request Error:", error.message);
//     // Rethrow the error for handling in the calling function
//     throw error;
//   }
// };

export const postApiRequest = async (
  endpoint: string,
  body: any,
  headers: object = {}
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData);

      // Throw the error message or a default message if it's not present
      throw new Error(
        errorData.message || errorData.detail || "Failed to fetch data"
      );
    }

    // If the response is empty, return an empty object
    const data = response.status === 204 ? {} : await response.json();
    return data;
  } catch (error: any) {
    console.error("API Request Error:", error.message);
    // Rethrow the error for handling in the calling function
    throw error;
  }
};

/**
 * Makes a GET request to a single API endpoint with authorization token.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} token - The authorization token for the request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
export const getSingleApiRequest = async (endpoint: string): Promise<any> => {
  try {
    const token = getTokenFromCookies();

    if (!token) {
      throw new Error("No token found, user might need to log in.");
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 401) {
      // Token might be expired or invalid, handle the unauthorized case
      throw new Error("Unauthorized: Token might be expired or invalid.");
    }

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in API request:", error);
    throw error;
  }
};

/**
 * Asynchronously fetches data from a specified API endpoint.
 *
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {string} token - The Bearer token for authorization.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 *
 * This function constructs a GET request to the provided endpoint, using the
 * base URL defined by `BASE_URL`. The request includes an Authorization header
 * with a Bearer token and sets the `Content-Type` to `application/json`. If the
 * response is not ok (status code outside the range 200-299), an error is thrown.
 * If the request is successful, the response is parsed as JSON and returned.
 * Any errors encountered during the fetch operation are caught, logged to the
 * console, and rethrown for further handling.
 */
export const getAllApiRequest = async (
  endpoint: string,
  token: string
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Makes an API request with pagination support and optional search query.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {number} pageSize - Number of items per page.
 * @param {number} pageNo - Page number to fetch.
 * @param {string} token - Authorization token for the request.
 * @param {string} [searchQuery=""] - Optional search query parameter.
 * @returns {Promise<any>} A promise that resolves with the parsed response data.
 */
export const getAllApiRequestWithPagination = async (
  endpoint: string,
  pageSize: number,
  pageNo: number,
  token: string,
  searchQuery: string = ""
): Promise<any> => {
  try {
    const query = searchQuery ? `&q=${searchQuery}` : "";

    const response = await fetch(
      `${BASE_URL}${endpoint}?page_size=${pageSize}&page=${pageNo}${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Updates data on the API server using a PUT request.
 * @param {string} endpoint - The API endpoint to send the request to.
 * @param {string} token - The authorization token for the request.
 * @param {object} data - The data to be updated on the server.
 * @returns {Promise<any>} A promise that resolves to the JSON response from the server.
 * @throws {Error} If the request fails or the response is not successful.
 */
export const updateApiRequest = async (
  endpoint: string,
  token: string | null,
  data: any
): Promise<any> => {
  // Construct full URL using BASE_URL from environment variables
  const url = `${BASE_URL}${endpoint}`;

  // Check if token is provided
  if (!token) {
    throw new Error("Authentication token is missing");
  }

  // Request configuration
  const requestOptions: RequestInit = {
    method: "PUT", // Use PUT for updates, or PATCH if partial updates
    headers: {
      Authorization: `Bearer ${token}`, // Bearer token for authentication
      "Content-Type": "application/json", // Set JSON content type
    },
    body: JSON.stringify(data), // Convert data object to JSON
  };

  try {
    // Send request to the server
    const response = await fetch(url, requestOptions);

    // Handle non-OK responses
    if (!response.ok) {
      const errorData = await response.json(); // Parse error response
      const statusCode = response.status;

      // Check for specific error codes
      if (statusCode === 404) {
        throw new Error("Resource not found (404). Check the endpoint.");
      } else if (statusCode === 400) {
        throw new Error(
          errorData.message || "Bad request (400). Check the submitted data."
        );
      } else if (statusCode === 500) {
        throw new Error("Server error (500). Please try again later.");
      }

      // For other status codes, throw a generic error
      throw new Error(errorData.message || "Failed to update data");
    }

    // Parse and return successful JSON response
    return await response.json();
  } catch (error) {
    // Catch and log any network or parsing errors
    console.error("Update request failed:", error);
    throw error; // Rethrow the error to be handled in the calling function
  }
};

/**
 * Adds a new user by making a POST request to the specified endpoint with the provided form data.
 * @param {Object} formData - The data of the user to be added.
 * @returns {Promise<any>} A promise that resolves with the response data if the user is added successfully.
 * @throws {Error} If there is an error adding the user.
 */
export const addUser = async (formData: object): Promise<any> => {
  const endpoint = "/auth/users/"; // Adjust the endpoint as needed
  try {
    const response = await postApiRequest(endpoint, formData);
    toast.success("User added successfully");
    return response;
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
};

/**
 * Updates user information on the server.
 * @param {string} userId - The ID of the user to be updated.
 * @param {object} formData - The data to be updated for the user.
 * @param {string} token - The authentication token for the user.
 * @param {function} setUser - The function to update the user context after successful update.
 * @returns {Promise<any>} A promise that resolves to the updated user data.
 */
export const updateUser = async (
  userId: string,
  formData: object,
  token: string,
  setUser: (user: any) => void
): Promise<any> => {
  const endpoint = `/auth/users/${userId}/`;
  try {
    const response = await updateApiRequest(endpoint, token, formData);
    setUser(response); // Update user context
    toast.success("User updated successfully");
    return response;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

/**
 * Sends a password reset link to the specified email address.
 * @param {string} email - The email address to send the password reset link to.
 * @returns {Promise<any>} A promise that resolves when the email is sent successfully.
 */
export const emailPasswordResetLink = async (email: string): Promise<any> => {
  const endpoint = "/api/resend_activation_email/";
  try {
    const response = await postApiRequest(endpoint, { email });
    toast.success("Activation email sent successfully.");
    return response;
  } catch (error) {
    console.error("Failed to send password reset link:", error);
    throw error;
  }
};
