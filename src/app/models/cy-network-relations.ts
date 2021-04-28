import { Relationship } from '../helpers/enums/types.enum';
import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the CyNetworkRelations aspect
 */
export class CyNetworkRelations extends AspectElement {
  private _parent?: number | undefined;
  private _childNetworkId: number | undefined;
  private _relationship?: Relationship | undefined;
  private _name?: string | undefined;

  /**
   * Class constructor
   * @param childNetworkId
   * @param parent
   * @param relationship
   * @param name
   */
  constructor(
    childNetworkId: number,
    parent?: number,
    relationship?: Relationship,
    name?: string
  ) {
    super();
    this._childNetworkId = childNetworkId;
    this._parent = parent;
    this._relationship = relationship;
    this._name = name;
  }

  /**
   * Parent network (optional, if missing parent is root-network)
   */
  public get parent(): number | undefined {
    return this._parent;
  }
  /**
   * Child network
   */
  public get childNetworkId(): number | undefined {
    return this._childNetworkId;
  }
  /**
   * Relationship type ("view", "subnetwork") (optional, if missing, default is “subnetwork”)
   */
  public get relationship(): Relationship | undefined {
    return this._relationship;
  }
  /**
   * Name of the child network (optional, if missing, default is reader-dependent)
   */

  public get name(): string | undefined {
    return this._name;
  }

  public set parent(value: number | undefined) {
    this._parent = value;
  }

  public set childNetworkId(value: number | undefined) {
    this._childNetworkId = value;
  }
  public set relationship(value: Relationship | undefined) {
    this._relationship = value;
  }
  public set name(value: string | undefined) {
    this._name = value;
  }
}
