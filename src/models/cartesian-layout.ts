import { AspectElement } from './aspect-element';

/**
 * This class represents the aspect elements for the cartesian layout aspect
 */
export class CartesianLayout extends AspectElement {
  private _node!: number;
  private _x!: number;
  private _y!: number;
  private _z?: number | undefined;
  private _view?: number | undefined;

  constructor() {
    super();
  }

  parseElement(value: {
    node: number;
    x: number;
    y: number;
    z?: number;
    view?: number;
  }): CartesianLayout {
    const cartesianLayout = new CartesianLayout();
    cartesianLayout.node = value.node;
    cartesianLayout.x = value.x;
    cartesianLayout.y = value.y;
    cartesianLayout.z = value.z;
    cartesianLayout.view = value.view;
    return cartesianLayout;
  }

  /**
   * Node id that specifies the node to which the coordinates apply
   */
  public get node(): number {
    return this._node;
  }

  /**
   * x coordinate
   */
  public get x(): number {
    return this._x;
  }
  /**
   * y coordinate
   */
  public get y(): number {
    return this._y;
  }
  /**
   * z coordinate
   */
  public get z(): number | undefined {
    return this._z;
  }

  /**
   * View id that identifies the Cytoscape view object to which an aspect element applies
   */
  public get view(): number | undefined {
    return this._view;
  }

  public set node(value: number) {
    this._node = value;
  }

  public set x(value: number) {
    this._x = value;
  }

  public set y(value: number) {
    this._y = value;
  }

  public set z(value: number | undefined) {
    this._z = value;
  }

  public set view(value: number | undefined) {
    this._view = value;
  }
}
