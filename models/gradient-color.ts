import { MappingContinuous } from './mapping-continuous';

/**
 * Color gradient for displaying continuous color mappings
 */
export class GradientColor {
  private _color: string;

  private _offset: string;

  private _numericThreshold: string;

  constructor(color: string, offset: string, numericThreshold: string) {
    this._color = color;
    this._offset = offset;
    this._numericThreshold = numericThreshold;
  }

  /**
   * Builds the color gradient for a continuous mapping with color application
   * @param mapping Mapping to be interpreted as color mapping
   * @private
   */
  static buildColorGradient(mapping: MappingContinuous): GradientColor[] {
    if (!mapping.validateThresholds(mapping.thresholds)) {
      return [];
    }

    const thresholds = mapping.thresholds as string[];
    const lowers = mapping.lowers as string[];
    const greaters = mapping.greaters as string[];
    const equals = mapping.equals as string[];

    const colorGradientCollection: GradientColor[] = [];
    const range: number =
      Number(thresholds[thresholds.length - 1]) - Number(thresholds[0]);
    if (range === 0) {
      return [];
    }
    colorGradientCollection.push(new GradientColor(lowers[0], '-1', '-1'));
    for (const th of thresholds) {
      const offset = (
        ((Number(th) - Number(thresholds[0])) * 100) /
        range
      ).toFixed(0);
      const gradient = new GradientColor(
        equals[thresholds.indexOf(th)],
        String(offset).concat('%'),
        th
      );
      colorGradientCollection.push(gradient);
    }
    colorGradientCollection.push(
      new GradientColor(greaters[greaters.length - 1], '101', '101')
    );

    return colorGradientCollection;
  }

  /**
   * Color value in hexadecimal notation, e.g. #ff00ff
   */
  public get color(): string {
    return this._color;
  }

  /**
   * Offset in percent to display the threshold respectively, where 0% is the left border and 100% is the right border
   */

  public get offset(): string {
    return this._offset;
  }

  /**
   * Numeric threshold needed for calculation of the offset in percent
   */
  public get numericThreshold(): string {
    return this._numericThreshold;
  }

  public set color(value: string) {
    this._color = value;
  }

  public set offset(value: string) {
    this._offset = value;
  }

  public set numericThreshold(value: string) {
    this._numericThreshold = value;
  }
}
