import {
  AspectCore,
  AspectCytoscape,
  AspectTypes,
} from '../helpers/enums/aspects.enum';
import { AspectElement } from './aspect-element';
import { Metadata } from './metadata';

/**
 * This class represents different aspects in a CX file
 * each Aspect has a metadata and an array of aspect elements
 */
export class Aspect<T extends AspectElement> {
  private _name: string;
  private _aspectPreMetaData?: Metadata | undefined;
  private _aspectPostMetaData?: Metadata | undefined;
  private _aspectElements: T[] = [];
  private _aspectType?: AspectTypes | undefined;

  /**
   * Class constructor
   * @param name
   */
  constructor(name: string) {
    this._name = name;
    this._aspectElements = [];
    this.aspectType = undefined;
  }

  /**
   * Name of the aspect (ex: nodes, edges..)
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Pre-metadata corresponding to this aspect
   */
  public get aspectPreMetaData(): Metadata | undefined {
    return this._aspectPreMetaData;
  }
  /**
   * Post-metadata corresponding to this aspect
   */
  public get aspectPostMetaData(): Metadata | undefined {
    return this._aspectPostMetaData;
  }
  /**
   * Aspect elements for this Aspect (ex: Node Aspect Elements like name, represnets...)
   */
  public get aspectElements(): AspectElement[] {
    return this._aspectElements;
  }
  /**
   * Aspect type that can be:
   * - Core
   * - Cytoscape
   * - Opaque
   */
  public get aspectType(): AspectTypes | undefined {
    return this._aspectType;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set aspectPreMetaData(value: Metadata | undefined) {
    this._aspectPreMetaData = value;
  }

  public set aspectPostMetaData(value: Metadata | undefined) {
    this._aspectPostMetaData = value;
  }

  public set aspectType(value: AspectTypes | undefined) {
    if (value === undefined) {
      if ((Object as any).values(AspectCore).includes(this._name)) {
        this._aspectType = AspectTypes.CORE;
      } else if ((<any>Object).values(AspectCytoscape).includes(this._name)) {
        this._aspectType = AspectTypes.CYTOSCAPE;
      } else {
        this._aspectType = AspectTypes.OPAQUE;
      }
    } else {
      this._aspectType = value;
    }
  }

  public isCore(): boolean {
    return this._aspectType === AspectTypes.CORE;
  }

  public isCytoscape(): boolean {
    return this._aspectType === AspectTypes.CYTOSCAPE;
  }

  public isOpaque(): boolean {
    return this._aspectType === AspectTypes.OPAQUE;
  }
}
