import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the CySubNetworks aspect
 */
export class CySubNetworks extends AspectElement {
  private _id: number;
  private _nodes: number[] | 'all';
  private _edges: number[] | 'all';

  constructor(id: number, nodes: number[] | 'all', edges: number[] | 'all') {
    super();
    this._id = id;
    this._nodes = nodes;
    this._edges = edges;
  }
  /**
   * Identifier of the subnetwork
   */
  public get id(): number {
    return this._id;
  }
  /**
   * Nodes making up the subnetwork - list of node identifiers, can be "all"
   */
  public get nodes(): number[] | 'all' {
    return this._nodes;
  }
  /**
   * Edges making up this subnetwork - list of edge identifiers, can be "all"
   */
  public get edges(): number[] | 'all' {
    return this._edges;
  }

  public set nodes(value: number[] | 'all') {
    this._nodes = value;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set edges(value: number[] | 'all') {
    this._edges = value;
  }
}
