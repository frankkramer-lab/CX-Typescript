import { DataTypes } from '../helpers/enums/types.enum';
import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the EdgeAttributes aspect
 */
export class EdgeAttributes extends AspectElement {
  private _property!: number;
  private n!: string;
  private _value!: any;
  private _dataType?: DataTypes | undefined;
  private _subNetworkId?: number | undefined;

  constructor() {
    super();
  }

  parseElement(value: {
    po: number;
    n: string;
    v: any;
    d?: DataTypes;
    s?: number;
  }): EdgeAttributes {
    const edgeAttributes = new EdgeAttributes();
    edgeAttributes.property = value.po;
    edgeAttributes.name = value.n;
    edgeAttributes.value = value.v;
    edgeAttributes.dataType = value.d;
    edgeAttributes.subNetworkId = value.s;
    return edgeAttributes;
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
   * Property of specifies the edge to which the attribute applies
   */
  public get property(): number {
    return this._property;
  }

  /**
   * Edge attribute name
   */
  public get name(): string {
    return this.n;
  }

  /**
   * Edge attribute value
   */
  public get value(): any {
    return this._value;
  }

  /**
   * Edge attribute value data type (default is "string")
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

  public set property(value: number) {
    this._property = value;
  }

  public set name(value: string) {
    this.n = value;
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
}
