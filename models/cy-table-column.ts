import { AppliesTo, DataTypes } from '../helpers/enums/types.enum';
import { AspectElement } from './aspect-element';
/**
 * This class represents the aspect elements for the CyTableColumn
 * its main use is to disambiguate empty table columns
 */
export class CyTableColumn extends AspectElement {
  private _subnetworkId?: number | undefined;
  private _name!: string;
  private _dataType?: DataTypes | undefined;
  private _appliesTo!: AppliesTo;

  constructor() {
    super();
  }

  parseElement(value: {
    s?: number;
    n: string;
    d?: DataTypes;
    applies_to: AppliesTo;
  }): CyTableColumn {
    const cyTableColumn = new CyTableColumn();
    cyTableColumn.subnetworkId = value.s;
    cyTableColumn.name = value.n;
    cyTableColumn.dataType = value.d;
    cyTableColumn.appliesTo = value.applies_to;
    return cyTableColumn;
  }

  /**
   * Identifier of the subnetwork this table column belongs to
   * if missing applies to root-network
   */
  public get subnetworkId(): number | undefined {
    return this._subnetworkId;
  }

  /**
   * Name of the table column
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Datatype of table column
   */
  public get dataType(): DataTypes | undefined {
    return this._dataType;
  }
  /**
   * Indicates whether this table applies to "node_table", "edge_table", or "network_table"
   */
  public get appliesTo(): AppliesTo {
    return this._appliesTo;
  }

  public set subnetworkId(value: number | undefined) {
    this._subnetworkId = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set dataType(value: DataTypes | undefined) {
    if (value === undefined) {
      this._dataType = DataTypes.STRING;
    } else {
      this._dataType = value;
    }
  }

  public set appliesTo(value: AppliesTo) {
    this._appliesTo = value;
  }
}
