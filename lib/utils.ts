import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { read, utils } from "xlsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Combines multiple class names using clsx and tailwind-merge
 * @param inputs - Class names to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Navigates to a URL using router.replace
 * @param url - The URL to navigate to
 * @param router - Next.js router instance
 */
export const gotoReplace = (url: string, router: AppRouterInstance): void => {
  router.replace(url);
};

/**
 * Navigates to a URL using router.push
 * @param url - The URL to navigate to
 * @param router - Next.js router instance
 */
export const gotoPush = (url: string, router: AppRouterInstance): void => {
  router.push(url);
};

/**
 * Interface for Excel extraction options
 */
export interface ExcelExtractionOptions {
  columnIndex?: number;
  sheetIndex?: number;
  hasHeader?: boolean;
  filterEmpty?: boolean;
}

/**
 * Generic function to extract data from an Excel file
 * @param file - The Excel file to extract data from
 * @param options - Extraction options
 * @returns Promise with the extracted data
 */
export const extractExcelData = <T = string>(
  file: File,
  options: ExcelExtractionOptions = {}
): Promise<T[]> => {
  const {
    columnIndex = 0,
    sheetIndex = 0,
    hasHeader = false,
    filterEmpty = true
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: "array" });
        
        // Validate sheet index
        if (sheetIndex >= workbook.SheetNames.length) {
          throw new Error(`Sheet index ${sheetIndex} is out of range. File has ${workbook.SheetNames.length} sheets.`);
        }
        
        const sheetName = workbook.SheetNames[sheetIndex];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][];

        // Skip header row if specified
        const startIndex = hasHeader ? 1 : 0;
        
        // Extract data from the specified column
        let extractedData = json
          .slice(startIndex)
          .map((row) => row[columnIndex] as T);
        
        // Filter out empty values if specified
        if (filterEmpty) {
          extractedData = extractedData.filter((value: T) => {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim() !== '';
            return true;
          });
        }

        resolve(extractedData);
      } catch (error) {
        console.error("Excel extraction error:", error);
        reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };

    reader.onerror = (error) => {
      console.error("File reading error:", error);
      reject(new Error("Failed to read the file"));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Extracts phone numbers from an Excel file
 * @param file - The Excel file containing phone numbers
 * @param options - Extraction options
 * @returns Promise with the extracted phone numbers
 */
export const extractPhoneNumbers = (
  file: File,
  options: Omit<ExcelExtractionOptions, 'columnIndex'> = {}
): Promise<string[]> => {
  return extractExcelData<string>(file, {
    columnIndex: 0,
    ...options
  });
};

/**
 * Extracts mandate references from an Excel file
 * @param file - The Excel file containing mandate references
 * @param options - Extraction options
 * @returns Promise with the extracted mandate references in a payload format
 */
export const extractMandateReference = (
  file: File,
  options: Omit<ExcelExtractionOptions, 'columnIndex'> = {}
): Promise<{ mandate_references: string[] }> => {
  return extractExcelData<string>(file, {
    columnIndex: 0,
    ...options
  }).then(mandateRef => ({
    mandate_references: mandateRef
  }));
};

/**
 * Formats a date to a readable string
 * @param date - The date to format
 * @param format - The format to use (default: 'long')
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  return dateString.replace("T", " ").slice(0, 19);
};

/**
 * Formats a currency amount
 * @param value - The amount to format
 * @returns Formatted currency string
 */
// Utility functions
export const formatCurrency = (value: string | number | undefined): string => {
  if (!value) return "N/A";
  const amount = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(amount)
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount)
    : "N/A";
};


/**
 * Truncates a string to a specified length
 * @param str - The string to truncate
 * @param length - The maximum length
 * @param ending - The ending to append (default: '...')
 * @returns Truncated string
 */
export const truncateString = (
  str: string,
  length: number,
  ending: string = '...'
): string => {
  if (str.length <= length) return str;
  return str.substring(0, length - ending.length) + ending;
};

/**
 * Generates a random ID
 * @param length - The length of the ID (default: 8)
 * @returns Random ID string
 */
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const getTime = (date: string | Date | null | undefined): string => {
  if (!date) return 'Invalid date';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Check if dateObj is a valid Date object
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }

    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid date';
  }
};
