/**
 * Format of a discrete mapping
 */
export interface MappingDiscrete {
  /**
   * Column of a node's or edge's property whose values are mapped
   */
  col: string;
  /**
   * Type of data which is mapped
   */
  type: string;
  /**
   * List of keys defining a discrete threshold, e.g. "protein" for property "type" of a node
   */
  keys: string[];
  /**
   * Applied value for the key in keys, e.g. "#ff0000" for NODE_FILL_COLOR, when "type" of a node is "protein".
   * Thus keys and values always need to be of the same length to cross reference correctly
   */
  values: string[];
}
