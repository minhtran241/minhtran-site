import { clsx } from 'clsx'; // Importing clsx utility for dynamic class names
import { twMerge } from 'tailwind-merge'; // Importing twMerge utility for Tailwind CSS class merging

/**
 * Combines given class names using Tailwind CSS and clsx.
 * @param {...string} inputs - Class names to combine.
 * @returns {string} - Combined class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs)); // Merging and returning class names
}
