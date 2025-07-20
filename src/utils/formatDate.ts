export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "TBA";
  }
  try {
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
