/**
 * Color gradient for displaying continuous color mappings
 */
export interface GradientColor {
  /**
   * Color value in hexadecimal notation, e.g. #ff00ff
   */
  color: string;

  /**
   * Offset in percent to display the threshold respectively, where 0% is the left border and 100% is the right border
   */
  offset: string;

  /**
   * Numeric threshold needed for calculation of the offset in percent
   */
  numericThreshold: string;
}