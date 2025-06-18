/**
 * Combines multiple class names into a single string.
 * Filters out falsy values.
 * @param {...(string | undefined | null | boolean)} args - Class names to combine.
 * @returns {string} - Combined class names.
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

/**
 * Bepaalt of een hex-kleur donker is.
 * @param {string} hex - De hex-kleurcode (bijv. '#RRGGBB').
 * @returns {boolean} - True als de kleur donker is, anders false.
 */
export function isDarkColor(hex) {
  if (!hex || hex.length < 4) return false;
  
  // Converteer hex naar RGB
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) { // #RGB
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) { // #RRGGBB
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  
  // Bereken de helderheid met de YIQ-formule
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq < 128;
} 