import { GradientColor } from './gradient-color';
import { Mapping } from './mapping';

export class MappingContinuous extends Mapping {
  /**
   * Column of a node's or edge's property whose values are mapped
   */
  private _col!: string;

  /**
   * Type of data which is mapped, should be double, integer or float
   * to be a valid continuous mapping
   */
  private _dataType?: string | undefined;
  /**
   * List of lower values for this style property on the specified index
   */
  private _lowers!: number[] | string[];

  /**
   * List of greater values for this style property on the specified index
   */
  private _greaters!: number[] | string[];

  /**
   * List of equal values for this style property on the specified index
   */
  private _equals!: number[] | string[];

  /**
   * List of the thresholds (OV's)
   */
  private _thresholds!: number[] | string[];

  /**
   * Color gradient info if the styleProperty can be interpreted as color
   */
  private _gradientColor!: GradientColor[];

  /**
   * True, if this mapping applies to a color property
   */
  private _isColor!: boolean;

  constructor() {
    super();
    this.col = '';
    this.dataType = '';
    this.lowers = [];
    this.greaters = [];
    this.equals = [];
    this.thresholds = [];
    this.gradientColor = [];
    this.isColor = true;
  }

  /**
   * Interprets a continuous mapping and elicits all their thresholds to display intuitively
   *
   * @param value JSON containing the mapping's definition
   */

  parseMappings(value: any): MappingContinuous {
    const commaSplit = value.definition.split(',');
    for (const cs of commaSplit) {
      const equalSplit = cs.split('=');

      switch (equalSplit[0]) {
        case 'COL':
          this.col = equalSplit[1];
          break;
        case 'T':
          this.dataType = equalSplit[1];
          break;
        case 'L':
          if (
            this.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            this.isColor = false;
          }
          this.lowers.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'E':
          if (
            this.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            this.isColor = false;
          }
          this.equals.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'G':
          if (
            this.isColor &&
            (equalSplit[2].length !== 7 || equalSplit[2].indexOf('#') !== 0)
          ) {
            this.isColor = false;
          }
          this.greaters.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'OV':
          this.thresholds.splice(equalSplit[1], 0, equalSplit[2]);
          break;
      }
    }
    if (this.isColor) {
      this.gradientColor = GradientColor.buildColorGradient(this);
    } else {
      this.gradientColor = [];
    }
    return this;
  }

  /**
   * Returns true, if the given list consists of distinct values
   * @param thresholds List of values to be checked
   * @private
   */
  validateThresholds(thresholds: number[] | string[]): boolean {
    const uniqueThresholds: any = [];

    for (const th of thresholds) {
      if (uniqueThresholds.includes(th)) {
        console.log(
          'Thresholds need to be distinct! No color gradient can be built!'
        );
        return false;
      }
      uniqueThresholds.push(th);
    }
    return true;
  }

  public get col(): string {
    return this._col;
  }

  public get dataType(): string | undefined {
    return this._dataType;
  }

  public get lowers(): number[] | string[] {
    return this._lowers;
  }

  public get greaters(): number[] | string[] {
    return this._greaters;
  }

  public get equals(): number[] | string[] {
    return this._equals;
  }

  public get thresholds(): number[] | string[] {
    return this._thresholds;
  }

  public get gradientColor(): GradientColor[] {
    return this._gradientColor;
  }

  public get isColor(): boolean {
    return this._isColor;
  }

  public set col(value: string) {
    this._col = value;
  }

  public set dataType(value: string | undefined) {
    this._dataType = value;
  }

  public set lowers(value: number[] | string[]) {
    this._lowers = value;
  }

  public set greaters(value: number[] | string[]) {
    this._greaters = value;
  }

  public set equals(value: number[] | string[]) {
    this._equals = value;
  }

  public set thresholds(value: number[] | string[]) {
    this._thresholds = value;
  }

  public set gradientColor(value: GradientColor[]) {
    this._gradientColor = value;
  }

  public set isColor(value: boolean) {
    this._isColor = value;
  }
}
