/**
 * Capitalizes the first letter of each word and converts the rest to lowercase.
 * @example: "john dow"  → "John Dow"
 *           "JOHN DOW"  → "John Dow"
 *           "jOhN dOw"  → "John Dow"
 */
export const capitalizeWords = (value: string) =>
  value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
