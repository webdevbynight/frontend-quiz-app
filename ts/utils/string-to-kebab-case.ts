/**
 * Converts a string to kebab case.
 * @param str - The string to convert.
 * @return The kebab-cased string.
 */
export const stringToKebabCase = (str: string): string => str.replace(/[^a-z]/gi, "-").toLowerCase();
