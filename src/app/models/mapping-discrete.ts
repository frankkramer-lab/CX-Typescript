import { Mapping } from './mapping';

/**
 * Format of a discrete mapping
 */
export class MappingDiscrete extends Mapping {
  private _col!: string;
  private _dataType!: string;
  private _keys!: string[];
  private _values!: string[];

  constructor() {
    super();
    this.col = '';
    this.dataType = '';
    this.keys = [];
    this.values = [];
  }

  /**
   * Creates a discrete mapping object based on the definition string.
   * Keys and values are always considered to be strings
   *
   * @param value JSON containing the mapping's definition
   */
  parseMappings(value: any): MappingDiscrete {
    // remove duplicate comma's
    const cleanDefinition = value.definition.replace(/,,/g, ',');
    const commaSplit = cleanDefinition.split(',');
    const tmpV = [];
    const tmpK = [];

    for (let cs of commaSplit) {
      cs = cs.replace(/%/g, ',');

      const equalSplit = cs.split('=');
      switch (equalSplit[0]) {
        case 'COL':
          this.col = equalSplit[1];
          break;
        case 'T':
          this.dataType = equalSplit[1];
          break;
        case 'K':
          this.keys.splice(equalSplit[1], 0, equalSplit[2]);
          break;
        case 'V':
          this.values.splice(equalSplit[1], 0, equalSplit[2]);
          break;
      }
    }
    return this;
  }

  /**
   * Column of a node's or edge's property whose values are mapped
   */

  public get col(): string {
    return this._col;
  }

  /**
   * Type of data which is mapped
   */

  public get dataType(): string {
    return this._dataType;
  }

  /**
   * List of keys defining a discrete threshold, e.g. "protein" for property "type" of a node
   */
  public get keys(): string[] {
    return this._keys;
  }

  /**
   * Applied value for the key in keys, e.g. "#ff0000" for NODE_FILL_COLOR, when "type" of a node is "protein".
   * Thus keys and values always need to be of the same length to cross reference correctly
   */

  public get values(): string[] {
    return this._values;
  }

  public set col(value: string) {
    this._col = value;
  }

  public set dataType(value: string) {
    this._dataType = value;
  }

  public set keys(value: string[]) {
    this._keys = value;
  }

  public set values(value: string[]) {
    this._values = value;
  }
}
