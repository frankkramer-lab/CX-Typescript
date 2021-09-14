import { AspectElement } from './aspect-element';

/**
 * This class represents aspect elements for the Nodes aspect
 */
export class Nodes extends AspectElement {
  private '@id'!: number;
  private n?: string | undefined;
  private r?: string | undefined;

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
    return this['@id'];
  }

  /**
   * Node name (single string)
   */
  public get name(): string | undefined {
    return this.n;
  }

  /**
   * Represents attribute  (single string)
   */
  public get represents(): string | undefined {
    return this.r;
  }

  public set id(value: number) {
    this['@id'] = value;
  }

  public set name(value: string | undefined) {
    this.n = value;
  }

  public set represents(value: string | undefined) {
    this.r = value;
  }
}
