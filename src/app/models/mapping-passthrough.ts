import { MappingTypes } from '../helpers/enums/mappings.enum';
import { Mapping } from './mapping';

/**
 * Simplest type of mapping
 */
export class MappingPassthrough extends Mapping {
  private _col!: string;

  constructor() {
    super();
  }

  parseMappings(value: any): MappingPassthrough {
    const regex = new RegExp('COL=(.*?),');
    const col = value.definition.match(regex)[1];

    this.col = col;
    this.type = MappingTypes.PASSTHROUGH;
    return this;
  }

  /**
   * Points to the data column
   */

  public get col(): string {
    return this._col;
  }
  public set col(value: string) {
    this._col = value;
  }
}
