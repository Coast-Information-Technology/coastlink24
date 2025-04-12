// @/utils/dateTimeUtils.ts

export const formatDateTime = (date: string | Date): string => {
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? "N/A" : parsedDate.toLocaleString();
};

