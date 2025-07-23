/**
 * Formats TMDB API date strings (YYYY-MM-DD) into en-US format.
 *
 * @param dateString - ISO date string from TMDB API (e.g., "2023-07-21") or null/undefined
 * @returns Formatted date string (e.g., "July 21, 2023"), "TBA" for missing dates, or "Invalid Date" for parse errors
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "TBA";
  }
  try {
    // Set time to midnight to avoid local timezone changing date
    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Failed to parse date string:", dateString, error);
    return "Invalid Date";
  }
};
