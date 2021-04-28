import { ElementProperties } from '../helpers/enums/types.enum';
import { KeyValue } from '../helpers/key-value';
import { AspectElement } from './aspect-element';
import { Mapping } from './mapping';

/**
 * This class represents the aspect elements for the CyVisualProperties aspect
 */
export class CyVisualProperties extends AspectElement {
  private _propertiesOf: ElementProperties;
  private _appliesTo?: number | undefined;
  private _view?: number | undefined;
  private _properties: KeyValue<string>;
  private _dependencies?: KeyValue<string> | undefined;
  private _mappings?: KeyValue<Mapping>[] | undefined;

  constructor(
    propertiesOf: ElementProperties,
    properties: KeyValue<string>,
    appliesTo?: number,
    view?: number,
    dependencies?: KeyValue<string>,
    mappings?: KeyValue<Mapping>[]
  ) {
    super();

    this._propertiesOf = propertiesOf;
    this._appliesTo = appliesTo;
    this._view = view;
    this._properties = properties;
    this._dependencies = dependencies;
    this._mappings = mappings;
  }

  /**
   * Indicate the element type that the visual property belong to
   * allowed values are: ("network", "nodes:default", "edges:default", "nodes", "edges")
   */

  public get propertiesOf(): ElementProperties {
    return this._propertiesOf;
  }

  /**
   * Identifier of the element that the visual property apply to
   */

  public get appliesTo(): number | undefined {
    return this._appliesTo;
  }

  /**
   * View that the visual property are associated with
   */

  public get view(): number | undefined {
    return this._view;
  }
  /**
   * key-value (string, string) pairs of the actual properties
   */
  public get properties(): KeyValue<string> {
    return this._properties;
  }
  /**
   * key-value (string, string) pairs of the dependencies
   */
  public get dependencies(): KeyValue<string> | undefined {
    return this._dependencies;
  }

  /**
   * key-value pairs (string, dictionary), in the form: "PROPERTY" : { "type" : "the mapping type", "definition" : "the actual mapping" }
   */
  public get mappings(): KeyValue<Mapping>[] | undefined {
    return this._mappings;
  }

  public set propertiesOf(value: ElementProperties) {
    this._propertiesOf = value;
  }

  public set appliesTo(value: number | undefined) {
    this._appliesTo = value;
  }

  public set view(value: number | undefined) {
    this._view = value;
  }

  public set properties(value: KeyValue<string>) {
    this._properties = value;
  }

  public set dependencies(value: KeyValue<string> | undefined) {
    this._dependencies = value;
  }

  public set mappings(value: KeyValue<Mapping>[] | undefined) {
    this._mappings = value;
  }
}
