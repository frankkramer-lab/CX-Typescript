import { MappingTypes } from '../helpers/enums/mappings.enum';
import { KeyValue } from '../helpers/key-value';
import { MappingContinuous } from './mapping-continuous';
import { MappingDiscrete } from './mapping-discrete';
import { MappingPassthrough } from './mapping-passthrough';

/**
 * This class represents the Mapping property in the cyVisualProperties aspect
 */
export abstract class Mapping {
  private _type!: MappingTypes;
  private _definition!:
    | MappingDiscrete
    | MappingContinuous
    | MappingPassthrough;

  constructor() {}

  abstract parseMappings(value: any): any;

  /**
   * Mapping type (Discrete, Continuous, Passthrough)
   */
  public get type(): MappingTypes {
    return this._type;
  }

  /**
   * The actual mapping value
   */
  public get definition():
    | MappingDiscrete
    | MappingContinuous
    | MappingPassthrough {
    switch (this._type) {
      case MappingTypes.COUNTINUOUS:
        return this._definition as MappingContinuous;
      case MappingTypes.DISCRETE:
        return this._definition as MappingDiscrete;

      case MappingTypes.PASSTHROUGH:
        return this._definition as MappingPassthrough;
      default:
        return this._definition;
    }
  }

  public set type(value: MappingTypes) {
    this._type = value;
  }

  public set definition(
    value: MappingDiscrete | MappingContinuous | MappingPassthrough
  ) {
    this._definition = value;
  }
}
