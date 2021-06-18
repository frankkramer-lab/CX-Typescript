import { KeyValue } from '../helpers/key-value';

/**
 * This class represents aspect elements for the Metadata aspect
 */
export class Metadata {
  private _name: string;
  private _version?: string | undefined;
  private _idCounter?: number | undefined;
  private _elementCount?: number | undefined;
  private _properties?: KeyValue<string>[] | undefined;
  private _lastUpdate?: number | undefined;
  private _consistencyGroup?: number | undefined;
  private _checksum?: string | undefined;

  /**
   * Class constructor
   * @param name
   * @param version
   * @param idCounter
   * @param elementCount
   * @param properties
   * @param lastUpdate
   * @param consistencyGroup
   * @param checksum
   */
  constructor(
    name: string,
    version?: string,
    idCounter?: number,
    elementCount?: number,
    properties?: KeyValue<string>[],
    lastUpdate?: number,
    consistencyGroup?: number,
    checksum?: string
  ) {
    this._name = name;
    this._version = version;
    this._idCounter = idCounter;
    this._elementCount = elementCount;
    this._properties = properties;
    this._lastUpdate = lastUpdate;
    this._consistencyGroup = consistencyGroup;
    this._checksum = checksum;
  }

  /**
   * Name of the aspect
   */
  public get name(): string {
    return this._name;
  }
  /**
   * Version of the aspect schema
   * Version is defined according to semantic versioning rules.
   * That is, if a service requires aspect A version 1.1.0, it would not accept aspect version 1.0.0 or aspect 2.0.0.
   */
  public get version(): string | undefined {
    return this._version;
  }

  /**
   * This is an integer monotonically increasing ID counter used for ID generation,
   * Represents the highest ID represented in the aspect or any of the aspect’s previous versions
   */
  public get idCounter(): number | undefined {
    return this._idCounter;
  }

  /**
   * Represents number of elements in this aspect
   */
  public get elementCount(): number | undefined {
    return this._elementCount;
  }

  /**
   * Aspect-defined property list
   */
  public get properties(): KeyValue<string>[] | undefined {
    return this._properties;
  }

  public get lastUpdate(): number | undefined {
    return this._lastUpdate;
  }

  /**
   * Identifier shared by aspects to indicate that they are mutually consistent
   * Used to help track status of the network as different programs operate on different sets of aspects
   */
  public get consistencyGroup(): number | undefined {
    return this._consistencyGroup;
  }

  /**
   * @deprecated NDEx CX implementation doesn’t support this attribute. This attribute is ignored in NDEx
   */
  public get checksum(): string | undefined {
    return this._checksum;
  }

  public set name(value: string) {
    this._name = value;
  }

  public set version(value: string | undefined) {
    this._version = value;
  }

  public set idCounter(value: number | undefined) {
    this._idCounter = value;
  }

  public set elementCount(value: number | undefined) {
    this._elementCount = value;
  }

  public set properties(value: KeyValue<string>[] | undefined) {
    this._properties = value;
  }

  public set lastUpdate(value: number | undefined) {
    this._lastUpdate = value;
  }

  public set consistencyGroup(value: number | undefined) {
    this._consistencyGroup = value;
  }

  public set checksum(value: string | undefined) {
    this._checksum = value;
  }
}
