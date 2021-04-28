import { AspectElement } from './aspect-element';

/**
 * This class represents aspect elements for the Nodes aspect
 */
export class Nodes extends AspectElement {
  private _id?: number | undefined;
  private _name?: string | undefined;
  private _represents?: string | undefined;

  /**
   * Class constructor
   * @param id
   * @param name
   * @param represents
   */
  constructor(id?: number, name?: string, represents?: string) {
    super();
    this._id = id;
    this._name = name;
    this._represents = represents;
  }

  /**
   * Node identifier
   * All node ids must be unique in the node aspect
   */
  public get id(): number | undefined {
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

  public set id(value: number | undefined) {
    this._id = value;
  }

  public set name(value: string | undefined) {
    this._name = value;
  }

  public set represents(value: string | undefined) {
    this._represents = value;
  }
}
