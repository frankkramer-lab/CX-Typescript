import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the CySubNetworks aspect
 */
export class CySubNetworks extends AspectElement {
  private _id!: number;
  private _nodes!: number[] | 'all';
  private _edges!: number[] | 'all';

  constructor() {
    super();
  }

  parseElement(value: {
    '@id': number;
    edges: number[] | 'all';
    nodes: number[] | 'all';
  }): CySubNetworks {
    const cySubNetworks = new CySubNetworks();
    cySubNetworks.id = value['@id'];
    cySubNetworks.edges = value.edges;
    cySubNetworks.nodes = value.nodes;
    return cySubNetworks;

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
