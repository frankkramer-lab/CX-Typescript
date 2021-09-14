import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the Edges
 */
export class Edges extends AspectElement {
  private '@id'!: number;
  private s!: number;
  private t!: number;
  private i?: string | undefined;

  constructor() {
    super();
  }

  parseElement(value: {
    '@id': number;
    s: number;
    t: number;
    i?: string;
  }): Edges {
    const edge = new Edges();
    edge.id = value['@id'];
    edge.source = value.s;
    edge.target = value.t;
    edge.interaction = value.i;
    return edge;
  }

  /**
   * Identifier used to refer to the edge (the “edge id”).
   * All edge ids must be unique in the edge aspect
   */
  public get id(): number {
    return this['@id'];
  }

  /**
   * Source node connected by the edge
   */
  public get source(): number {
    return this.s;
  }

  /**
   * Target node connected by the edge
   */
  public get target(): number {
    return this.t;
  }

  /**
   * Interaction field
   */
  public get interaction(): string | undefined {
    return this.i;
  }

  public set id(value: number) {
    this['@id'] = value;
  }

  public set source(value: number) {
    this.s = value;
  }

  public set target(value: number) {
    this.t = value;
  }

  public set interaction(value: string | undefined) {
    this.i = value;
  }
}
