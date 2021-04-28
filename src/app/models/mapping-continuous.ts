import { GradientColor } from './gradient-color';

export interface MappingContinuous {
  /**
   * Column of a node's or edge's property whose values are mapped
   */
  col: string;
  /**
   * Type of data which is mapped, should be double, integer or float
   * to be a valid continuous mapping
   */
  type?: string;
  /**
   * List of lower values for this style property on the specified index
   */
  lowers: number[] | string[];
  /**
   * List of greater values for this style property on the specified index
   */
  greaters: number[] | string[];
  /**
   * List of equal values for this style property on the specified index
   */
  equals: number[] | string[];
  /**
   * List of the thresholds (OV's)
   */
  thresholds: number[] | string[];
  /**
   * Color gradient info if the styleProperty can be interpreted as color
   */
  gradientColor: GradientColor[];
  /**
   * True, if this mapping applies to a color property
   */
  isColor: boolean;
}
