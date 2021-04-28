import { DataTypes } from '../helpers/enums/types.enum';
import { AspectElement } from './aspect-element';

/**
 * This class represents aspect elements for the CyHiddenAttributes aspect
 */
export class CyHiddenAttributes extends AspectElement {
  private _subNetworkId?: number | undefined;
  private _name: string;
  private _value: any;
  private _dataType?: DataTypes | undefined;

  /**
   * Class constructor
   * @param name
   * @param value
   * @param subNetworkId
   * @param dataType
   */
  constructor(
    name: string,
    value: any[],
    subNetworkId?: number,
    dataType?: DataTypes
  ) {
    super();
    this._subNetworkId = subNetworkId;
    this._name = name;
    this._value = value;
    this._dataType = dataType;
  }

  /**
   * Identifier of the subnetwork this hidden attribute belongs to (optional, if missing applies to root-network)
   */
  public get subNetworkId(): number | undefined {
    return this._subNetworkId;
  }

  /**
   * Name of this hidden attribute
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Actual value(s) - either a single value or a list
   */
  public get value(): any {
    return this._value;
  }

  /**
   * Datatype of this hidden attribute (optional, defaults to "string")
   */
  public get dataType(): DataTypes | undefined {
    return this._dataType;
  }

  public set subNetworkId(value: number | undefined) {
    this._subNetworkId = value;
  }
  public set name(value: string) {
    this._name = value;
  }

  public set value(value: any) {
    this._value = value;
  }

  public set dataType(value: DataTypes | undefined) {
    if (value === undefined) {
      this._dataType = DataTypes.STRING;
    } else {
      this._dataType = value;
      this.parseValueToDataType();
    }
  }

  private parseValueToDataType() {
    switch (this.dataType) {
      case DataTypes.LONG:
      case DataTypes.DOUBLE:
      case DataTypes.INTEGER:
        this.value = Number(this.value);
        break;
      case DataTypes.BOOLEAN:
        this.value = Boolean(this.value);
        break;

      case DataTypes.LIST_OF_LONG:
      case DataTypes.LIST_OF_DOUBLE:
      case DataTypes.LIST_OF_INTEGER:
        this.value.map((v: any) => Number(v));
        break;

      default:
        break;
    }
  }
}
