import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the Edges
 */
export class Edges extends AspectElement {
  private _id: number;
  private _source: number;
  private _target: number;
  private _interaction?: string | undefined;

  /**
   * Class constructor
   * @param id
   * @param source
   * @param target
   * @param interaction
   */
  constructor(
    id: number,
    source: number,
    target: number,
    interaction?: string
  ) {
    super();
    this._id = id;
    this._source = source;
    this._target = target;
    this._interaction = interaction;
  }

  /**
   * Identifier used to refer to the edge (the “edge id”).
   * All edge ids must be unique in the edge aspect
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Source node connected by the edge
   */
  public get source(): number {
    return this._source;
  }

  /**
   * Target node connected by the edge
   */
  public get target(): number {
    return this._target;
  }

  /**
   * Interaction field
   */
  public get interaction(): string | undefined {
    return this._interaction;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set source(value: number) {
    this._source = value;
  }

  public set target(value: number) {
    this._target = value;
  }

  public set interaction(value: string | undefined) {
    this._interaction = value;
  }
}
