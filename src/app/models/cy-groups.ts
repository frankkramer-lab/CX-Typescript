import { AspectElement } from './aspect-element';

/**
 * This class represents apsect elements for CyGroups aspect
 */
export class CyGroups extends AspectElement {
  private _id: number;
  private _name: string;
  private _nodes: number[];
  private _externalEdges: number[];
  private _internalEdges: number[];
  private _collapsed?: boolean | undefined;

  /**
   * Class constructor
   * @param id
   * @param name
   * @param nodes
   * @param externalEdges
   * @param internalEdges
   * @param collapsed
   */
  constructor(
    id: number,
    name: string,
    nodes: number[],
    externalEdges: number[],
    internalEdges: number[],
    collapsed?: boolean
  ) {
    super();
    this._id = id;
    this._name = name;
    this._nodes = nodes;
    this._externalEdges = externalEdges;
    this._internalEdges = internalEdges;
    this._collapsed = collapsed;
  }

  /**
   * Identifier of the group
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Name of the group
   */

  public get name(): string {
    return this._name;
  }

  /**
   * Nodes making up the group
   */

  public get nodes(): number[] {
    return this._nodes;
  }

  /**
   * External edges making up the group
   */

  public get externalEdges(): number[] {
    return this._externalEdges;
  }

  /**
   * Internal edges making up the group
   */
  public get internalEdges(): number[] {
    return this._internalEdges;
  }

  /**
   * Boolean value to indicate whether the group is displayed as a single node
   */

  public get collapsed(): boolean | undefined {
    return this._collapsed;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set nodes(value: number[]) {
    this._nodes = value;
  }

  public set externalEdges(value: number[]) {
    this._externalEdges = value;
  }

  public set internalEdges(value: number[]) {
    this._internalEdges = value;
  }

  public set collapsed(value: boolean | undefined) {
    this._collapsed = value;
  }
}
