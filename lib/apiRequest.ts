import { toast } from "react-toastify";

// Define the base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Define common response types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
  detail?: string;
}

/**
 * Generic API request function that handles all HTTP methods
 * @param endpoint - The API endpoint to send the request to
 * @param method - HTTP method (GET, POST, PUT, DELETE)
 * @param body - Request body for POST/PUT requests
 * @param token - Authorization token
 * @param headers - Additional headers
 * @returns Promise with the API response
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  token?: string,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  // Prepare headers
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  // Add authorization token if provided
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  // Prepare request options
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };
  
  // Add body for non-GET requests
  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }
  
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
    
    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    // Get response text first
    const responseText = await response.text();
    
    // Parse JSON if possible
    let data: any = {};
    if (isJson && responseText) {
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
      }
    }
    
    // Handle error responses
    if (!response.ok) {
      const error: ApiError = {
        message: data.detail || data.message || 'Request failed',
        status: response.status,
        errors: data.errors,
        detail: data.detail,
      };
      
      // Log error details
      console.error(`API Error (${endpoint}):`, error);
      
      // Show toast for user-facing errors
      if (error.message && error.status >= 400 && error.status < 500) {
        toast.error(error.message);
      }
      
      throw error;
    }
    
    return {
      data,
      status: response.status,
      message: data.message,
    };
  } catch (error: any) {
    // Handle network errors or other exceptions
    const apiError: ApiError = {
      message: error.message || 'Network error occurred',
      status: error.status || 0,
    };
    
    console.error(`API Request Failed (${endpoint}):`, apiError);
    throw apiError;
  }
};

/**
 * Makes a GET request to a single API endpoint with authorization token.
 * @param endpoint - The API endpoint to fetch data from
 * @param token - The authorization token for the request
 * @returns Promise with the fetched data
 */
export const getSingleApiRequest = async <T = any>(
  endpoint: string,
  token: string
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'GET', undefined, token);
  return response.data;
};

/**
 * Asynchronously fetches data from a specified API endpoint.
 * @param endpoint - The API endpoint to fetch data from
 * @param token - The Bearer token for authorization
 * @returns Promise with the fetched data
 */
export const getAllApiRequest = async <T = any>(
  endpoint: string,
  token: string
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'GET', undefined, token);
  return response.data;
};

/**
 * Makes an API request with pagination support and optional search query.
 * @param endpoint - The API endpoint to send the request to
 * @param pageSize - Number of items per page
 * @param pageNo - Page number to fetch
 * @param token - Authorization token for the request
 * @param searchQuery - Optional search query parameter
 * @returns Promise with the paginated data
 */
export const getAllApiRequestWithPagination = async <T = any>(
  endpoint: string,
  pageSize: number,
  pageNo: number,
  token: string,
  searchQuery = ""
): Promise<T> => {
  const query = searchQuery ? `&q=${encodeURIComponent(searchQuery)}` : "";
  const paginatedEndpoint = `${endpoint}?page_size=${pageSize}&page=${pageNo}${query}`;
  
  const response = await apiRequest<T>(paginatedEndpoint, 'GET', undefined, token);
  return response.data;
};

/**
 * Makes a POST request to the specified API endpoint with the provided body and optional headers.
 * @param endpoint - The API endpoint to send the POST request to
 * @param body - The data to be sent in the request body
 * @param headers - Additional headers to include in the request
 * @returns Promise with the response data
 */
export const postApiRequest = async <T = any>(
  endpoint: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'POST', body, '', headers);
  return response.data;
};

/**
 * Updates data on the API server using a PUT request.
 * @param endpoint - The API endpoint to send the request to
 * @param token - The authorization token for the request
 * @param data - The data to be updated on the server
 * @returns Promise with the updated data
 */
export const updateApiRequest = async <T = any>(
  endpoint: string,
  token: string,
  data: any
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'PUT', data, token);
  return response.data;
};

/**
 * Adds a new user by making a POST request to the specified endpoint with the provided form data.
 * @param formData - The data of the user to be added
 * @returns Promise with the response data
 */
export const addUser = async <T = any>(formData: any): Promise<T> => {
  const endpoint = "/auth/users/";
  try {
    const data = await postApiRequest<T>(endpoint, formData);
    toast.success("User added successfully");
    return data;
  } catch (error: any) {
    console.error("Failed to add user:", error);
    toast.error(error.message || "Failed to add user");
    throw error;
  }
};

/**
 * Updates user information on the server.
 * @param userId - The ID of the user to be updated
 * @param formData - The data to be updated for the user
 * @param token - The authentication token for the user
 * @param setUser - The function to update the user context after successful update
 * @returns Promise with the updated user data
 */
export const updateUser = async <T = any>(
  userId: string,
  formData: any,
  token: string,
  setUser: (user: T) => void
): Promise<T> => {
  const endpoint = "/auth/users/me/";
  try {
    const data = await updateApiRequest<T>(endpoint, token, formData);
    setUser(data); // Update context
    toast.success("User updated successfully");
    return data;
  } catch (error: any) {
    console.error("Failed to update user:", error);
    toast.error(error.message || "Failed to update user");
    throw error;
  }
};

/**
 * Makes a POST request to check data without throwing errors for non-200 responses.
 * @param endpoint - The API endpoint to send the request to
 * @param body - The data to be sent in the request body
 * @param headers - Additional headers to include in the request
 * @returns Promise with the response status and data
 */
export const postApiCheckerRequest = async <T = any>(
  endpoint: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<{ status: number; data: T }> => {
  try {
    const response = await apiRequest<T>(endpoint, 'POST', body, undefined, headers);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    // For checker requests, we return the error instead of throwing
    return {
      status: error.status || 500,
      data: error as T,
    };
  }
};

/**
 * Makes a POST request for bulk checking operations.
 * @param endpoint - The API endpoint to send the request to
 * @param body - The data to be sent in the request body
 * @param headers - Additional headers to include in the request
 * @returns Promise with the response data
 */
export const postApiBulkCheckerRequest = async <T = any>(
  endpoint: string,
  body: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'POST', body, undefined, headers);
  return response.data;
};

/**
 * Makes a DELETE request to the specified API endpoint.
 * @param endpoint - The API endpoint to send the DELETE request to
 * @param token - The authorization token for the request
 * @returns Promise with the response data
 */
export const deleteApiRequest = async <T = any>(
  endpoint: string,
  token: string
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'DELETE', undefined, token);
  return response.data;
};

/**
 * Makes a PATCH request to the specified API endpoint.
 * @param endpoint - The API endpoint to send the PATCH request to
 * @param token - The authorization token for the request
 * @param data - The data to be updated on the server
 * @returns Promise with the updated data
 */
export const patchApiRequest = async <T = any>(
  endpoint: string,
  token: string,
  data: any
): Promise<T> => {
  const response = await apiRequest<T>(endpoint, 'PATCH', data, token);
  return response.data;
};