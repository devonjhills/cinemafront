/**
 * Converts movie runtime from minutes to hour/minute format.
 *
 * @param minutes - Movie runtime in minutes from TMDB API
 * @returns Formatted runtime string (e.g., "2h 34m", "45m", "2h") or "Unknown" for invalid input
 */
export const formatRuntime = (minutes: number): string => {
  if (!minutes || minutes <= 0) return "Unknown";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};
