import { DataTypes } from '../helpers/enums/types.enum';
import { SpeciallyNetworkAttributes } from '../helpers/enums/specially-attributes.enum';
import { AspectElement } from './aspect-element';

/**
 * This class represents aspect elements for the NetworkAttributes aspect
 */
export class NetworkAttributes extends AspectElement {
  private _name!: string;
  private _value!: any;
  private _dataType?: DataTypes | undefined;
  private _subNetworkId?: number | undefined;

  constructor() {
    super();
  }

  parseElement(value: {
    n: string;
    v: any;
    d?: DataTypes;
    s?: number;
  }): NetworkAttributes {
    const networkAttributes = new NetworkAttributes();
    networkAttributes.name = value.n;
    networkAttributes.value = value.v;
    networkAttributes.dataType = value.d;
    networkAttributes.subNetworkId = value.s;
    return networkAttributes;
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

  /**
   * Attribute name
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Attribute value
   */
  public get value(): any {
    return this._value;
  }

  /**
   * Attribute value data type (default is "string")
   */
  public get dataType(): DataTypes | undefined {
    return this._dataType;
  }

  /**
   * Subnetwork id that identifies the Cytoscape subnetwork object to which an aspect element applies
   */
  public get subNetworkId(): number | undefined {
    return this._subNetworkId;
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

  public set subNetworkId(value: number | undefined) {
    this._subNetworkId = value;
  }

  public getSpeciallyNetworkAttributes(attribue: SpeciallyNetworkAttributes) {
    if (this.name === attribue.toString()) {
      return this.value;
    }
    return undefined;
  }

}
