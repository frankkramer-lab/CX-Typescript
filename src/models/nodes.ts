import { AspectElement } from './aspect-element';

/**
 * This class represents aspect elements for the Nodes aspect
 */
export class Nodes extends AspectElement {
  private _id!: number;
  private _name?: string | undefined;
  private _represents?: string | undefined;

  constructor() {
    super();
  }

 parseElement(value: {'@id': number, n?: string, r?: string}): Nodes {
  const node = new Nodes();
  node.id = value['@id'];
  node.name = value.n;
  node.represents = value.r;
  return node;
  }

  /**
   * Node identifier
   * All node ids must be unique in the node aspect
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Node name (single string)
   */
  public get name(): string | undefined {
    return this._name;
  }

  /**
   * Represents attribute  (single string)
   */
  public get represents(): string | undefined {
    return this._represents;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set name(value: string | undefined) {
    this._name = value;
  }

  public set represents(value: string | undefined) {
    this._represents = value;
  }
}
